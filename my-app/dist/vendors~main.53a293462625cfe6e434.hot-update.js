webpackHotUpdate("vendors~main",{

/***/ "./node_modules/_codemirror@5.61.0@codemirror/addon/comment/comment.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/_codemirror@5.61.0@codemirror/addon/comment/comment.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/_codemirror@5.61.0@codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  var noOptions = {};
  var nonWS = /[^\s\u00a0]/;
  var Pos = CodeMirror.Pos,
      cmp = CodeMirror.cmpPos;

  function firstNonWS(str) {
    var found = str.search(nonWS);
    return found == -1 ? 0 : found;
  }

  CodeMirror.commands.toggleComment = function (cm) {
    cm.toggleComment();
  };

  CodeMirror.defineExtension("toggleComment", function (options) {
    if (!options) options = noOptions;
    var cm = this;
    var minLine = Infinity,
        ranges = this.listSelections(),
        mode = null;

    for (var i = ranges.length - 1; i >= 0; i--) {
      var from = ranges[i].from(),
          to = ranges[i].to();
      if (from.line >= minLine) continue;
      if (to.line >= minLine) to = Pos(minLine, 0);
      minLine = from.line;

      if (mode == null) {
        if (cm.uncomment(from, to, options)) mode = "un";else {
          cm.lineComment(from, to, options);
          mode = "line";
        }
      } else if (mode == "un") {
        cm.uncomment(from, to, options);
      } else {
        cm.lineComment(from, to, options);
      }
    }
  }); // Rough heuristic to try and detect lines that are part of multi-line string

  function probablyInsideString(cm, pos, line) {
    return /\bstring\b/.test(cm.getTokenTypeAt(Pos(pos.line, 0))) && !/^[\'\"\`]/.test(line);
  }

  function getMode(cm, pos) {
    var mode = cm.getMode();
    return mode.useInnerComments === false || !mode.innerMode ? mode : cm.getModeAt(pos);
  }

  CodeMirror.defineExtension("lineComment", function (from, to, options) {
    if (!options) options = noOptions;
    var self = this,
        mode = getMode(self, from);
    var firstLine = self.getLine(from.line);
    if (firstLine == null || probablyInsideString(self, from, firstLine)) return;
    var commentString = options.lineComment || mode.lineComment;

    if (!commentString) {
      if (options.blockCommentStart || mode.blockCommentStart) {
        options.fullLines = true;
        self.blockComment(from, to, options);
      }

      return;
    }

    var end = Math.min(to.ch != 0 || to.line == from.line ? to.line + 1 : to.line, self.lastLine() + 1);
    var pad = options.padding == null ? " " : options.padding;
    var blankLines = options.commentBlankLines || from.line == to.line;
    self.operation(function () {
      if (options.indent) {
        var baseString = null;

        for (var i = from.line; i < end; ++i) {
          var line = self.getLine(i);
          var whitespace = line.slice(0, firstNonWS(line));

          if (baseString == null || baseString.length > whitespace.length) {
            baseString = whitespace;
          }
        }

        for (var i = from.line; i < end; ++i) {
          var line = self.getLine(i),
              cut = baseString.length;
          if (!blankLines && !nonWS.test(line)) continue;
          if (line.slice(0, cut) != baseString) cut = firstNonWS(line);
          self.replaceRange(baseString + commentString + pad, Pos(i, 0), Pos(i, cut));
        }
      } else {
        for (var i = from.line; i < end; ++i) {
          if (blankLines || nonWS.test(self.getLine(i))) self.replaceRange(commentString + pad, Pos(i, 0));
        }
      }
    });
  });
  CodeMirror.defineExtension("blockComment", function (from, to, options) {
    if (!options) options = noOptions;
    var self = this,
        mode = getMode(self, from);
    var startString = options.blockCommentStart || mode.blockCommentStart;
    var endString = options.blockCommentEnd || mode.blockCommentEnd;

    if (!startString || !endString) {
      if ((options.lineComment || mode.lineComment) && options.fullLines != false) self.lineComment(from, to, options);
      return;
    }

    if (/\bcomment\b/.test(self.getTokenTypeAt(Pos(from.line, 0)))) return;
    var end = Math.min(to.line, self.lastLine());
    if (end != from.line && to.ch == 0 && nonWS.test(self.getLine(end))) --end;
    var pad = options.padding == null ? " " : options.padding;
    if (from.line > end) return;
    self.operation(function () {
      if (options.fullLines != false) {
        var lastLineHasText = nonWS.test(self.getLine(end));
        self.replaceRange(pad + endString, Pos(end));
        self.replaceRange(startString + pad, Pos(from.line, 0));
        var lead = options.blockCommentLead || mode.blockCommentLead;
        if (lead != null) for (var i = from.line + 1; i <= end; ++i) if (i != end || lastLineHasText) self.replaceRange(lead + pad, Pos(i, 0));
      } else {
        var atCursor = cmp(self.getCursor("to"), to) == 0,
            empty = !self.somethingSelected();
        self.replaceRange(endString, to);
        if (atCursor) self.setSelection(empty ? to : self.getCursor("from"), to);
        self.replaceRange(startString, from);
      }
    });
  });
  CodeMirror.defineExtension("uncomment", function (from, to, options) {
    if (!options) options = noOptions;
    var self = this,
        mode = getMode(self, from);
    var end = Math.min(to.ch != 0 || to.line == from.line ? to.line : to.line - 1, self.lastLine()),
        start = Math.min(from.line, end); // Try finding line comments

    var lineString = options.lineComment || mode.lineComment,
        lines = [];
    var pad = options.padding == null ? " " : options.padding,
        didSomething;

    lineComment: {
      if (!lineString) break lineComment;

      for (var i = start; i <= end; ++i) {
        var line = self.getLine(i);
        var found = line.indexOf(lineString);
        if (found > -1 && !/comment/.test(self.getTokenTypeAt(Pos(i, found + 1)))) found = -1;
        if (found == -1 && nonWS.test(line)) break lineComment;
        if (found > -1 && nonWS.test(line.slice(0, found))) break lineComment;
        lines.push(line);
      }

      self.operation(function () {
        for (var i = start; i <= end; ++i) {
          var line = lines[i - start];
          var pos = line.indexOf(lineString),
              endPos = pos + lineString.length;
          if (pos < 0) continue;
          if (line.slice(endPos, endPos + pad.length) == pad) endPos += pad.length;
          didSomething = true;
          self.replaceRange("", Pos(i, pos), Pos(i, endPos));
        }
      });
      if (didSomething) return true;
    } // Try block comments


    var startString = options.blockCommentStart || mode.blockCommentStart;
    var endString = options.blockCommentEnd || mode.blockCommentEnd;
    if (!startString || !endString) return false;
    var lead = options.blockCommentLead || mode.blockCommentLead;
    var startLine = self.getLine(start),
        open = startLine.indexOf(startString);
    if (open == -1) return false;
    var endLine = end == start ? startLine : self.getLine(end);
    var close = endLine.indexOf(endString, end == start ? open + startString.length : 0);
    var insideStart = Pos(start, open + 1),
        insideEnd = Pos(end, close + 1);
    if (close == -1 || !/comment/.test(self.getTokenTypeAt(insideStart)) || !/comment/.test(self.getTokenTypeAt(insideEnd)) || self.getRange(insideStart, insideEnd, "\n").indexOf(endString) > -1) return false; // Avoid killing block comments completely outside the selection.
    // Positions of the last startString before the start of the selection, and the first endString after it.

    var lastStart = startLine.lastIndexOf(startString, from.ch);
    var firstEnd = lastStart == -1 ? -1 : startLine.slice(0, from.ch).indexOf(endString, lastStart + startString.length);
    if (lastStart != -1 && firstEnd != -1 && firstEnd + endString.length != from.ch) return false; // Positions of the first endString after the end of the selection, and the last startString before it.

    firstEnd = endLine.indexOf(endString, to.ch);
    var almostLastStart = endLine.slice(to.ch).lastIndexOf(startString, firstEnd - to.ch);
    lastStart = firstEnd == -1 || almostLastStart == -1 ? -1 : to.ch + almostLastStart;
    if (firstEnd != -1 && lastStart != -1 && lastStart != to.ch) return false;
    self.operation(function () {
      self.replaceRange("", Pos(end, close - (pad && endLine.slice(close - pad.length, close) == pad ? pad.length : 0)), Pos(end, close + endString.length));
      var openEnd = open + startString.length;
      if (pad && startLine.slice(openEnd, openEnd + pad.length) == pad) openEnd += pad.length;
      self.replaceRange("", Pos(start, open), Pos(start, openEnd));
      if (lead) for (var i = start + 1; i <= end; ++i) {
        var line = self.getLine(i),
            found = line.indexOf(lead);
        if (found == -1 || nonWS.test(line.slice(0, found))) continue;
        var foundEnd = found + lead.length;
        if (pad && line.slice(foundEnd, foundEnd + pad.length) == pad) foundEnd += pad.length;
        self.replaceRange("", Pos(i, found), Pos(i, foundEnd));
      }
    });
    return true;
  });
});

/***/ }),

/***/ "./node_modules/_codemirror@5.61.0@codemirror/addon/edit/matchbrackets.js":
false,

/***/ "./node_modules/_codemirror@5.61.0@codemirror/addon/search/searchcursor.js":
false,

/***/ "./node_modules/_codemirror@5.61.0@codemirror/addon/selection/mark-selection.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/_codemirror@5.61.0@codemirror/addon/selection/mark-selection.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
// Because sometimes you need to mark the selected *text*.
//
// Adds an option 'styleSelectedText' which, when enabled, gives
// selected text the CSS class given as option value, or
// "CodeMirror-selectedtext" when the value is not a string.
(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "./node_modules/_codemirror@5.61.0@codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineOption("styleSelectedText", false, function (cm, val, old) {
    var prev = old && old != CodeMirror.Init;

    if (val && !prev) {
      cm.state.markedSelection = [];
      cm.state.markedSelectionStyle = typeof val == "string" ? val : "CodeMirror-selectedtext";
      reset(cm);
      cm.on("cursorActivity", onCursorActivity);
      cm.on("change", onChange);
    } else if (!val && prev) {
      cm.off("cursorActivity", onCursorActivity);
      cm.off("change", onChange);
      clear(cm);
      cm.state.markedSelection = cm.state.markedSelectionStyle = null;
    }
  });

  function onCursorActivity(cm) {
    if (cm.state.markedSelection) cm.operation(function () {
      update(cm);
    });
  }

  function onChange(cm) {
    if (cm.state.markedSelection && cm.state.markedSelection.length) cm.operation(function () {
      clear(cm);
    });
  }

  var CHUNK_SIZE = 8;
  var Pos = CodeMirror.Pos;
  var cmp = CodeMirror.cmpPos;

  function coverRange(cm, from, to, addAt) {
    if (cmp(from, to) == 0) return;
    var array = cm.state.markedSelection;
    var cls = cm.state.markedSelectionStyle;

    for (var line = from.line;;) {
      var start = line == from.line ? from : Pos(line, 0);
      var endLine = line + CHUNK_SIZE,
          atEnd = endLine >= to.line;
      var end = atEnd ? to : Pos(endLine, 0);
      var mark = cm.markText(start, end, {
        className: cls
      });
      if (addAt == null) array.push(mark);else array.splice(addAt++, 0, mark);
      if (atEnd) break;
      line = endLine;
    }
  }

  function clear(cm) {
    var array = cm.state.markedSelection;

    for (var i = 0; i < array.length; ++i) array[i].clear();

    array.length = 0;
  }

  function reset(cm) {
    clear(cm);
    var ranges = cm.listSelections();

    for (var i = 0; i < ranges.length; i++) coverRange(cm, ranges[i].from(), ranges[i].to());
  }

  function update(cm) {
    if (!cm.somethingSelected()) return clear(cm);
    if (cm.listSelections().length > 1) return reset(cm);
    var from = cm.getCursor("start"),
        to = cm.getCursor("end");
    var array = cm.state.markedSelection;
    if (!array.length) return coverRange(cm, from, to);
    var coverStart = array[0].find(),
        coverEnd = array[array.length - 1].find();
    if (!coverStart || !coverEnd || to.line - from.line <= CHUNK_SIZE || cmp(from, coverEnd.to) >= 0 || cmp(to, coverStart.from) <= 0) return reset(cm);

    while (cmp(from, coverStart.from) > 0) {
      array.shift().clear();
      coverStart = array[0].find();
    }

    if (cmp(from, coverStart.from) < 0) {
      if (coverStart.to.line - from.line < CHUNK_SIZE) {
        array.shift().clear();
        coverRange(cm, from, coverStart.to, 0);
      } else {
        coverRange(cm, from, coverStart.from, 0);
      }
    }

    while (cmp(to, coverEnd.to) < 0) {
      array.pop().clear();
      coverEnd = array[array.length - 1].find();
    }

    if (cmp(to, coverEnd.to) > 0) {
      if (to.line - coverEnd.from.line < CHUNK_SIZE) {
        array.pop().clear();
        coverRange(cm, coverEnd.from, to);
      } else {
        coverRange(cm, coverEnd.to, to);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/_codemirror@5.61.0@codemirror/keymap/sublime.js":
false,

/***/ "./node_modules/_codemirror@5.61.0@codemirror/theme/monokai.css":
false,

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/_codemirror@5.61.0@codemirror/theme/monokai.css":
false

})
//# sourceMappingURL=vendors~main.53a293462625cfe6e434.hot-update.js.map