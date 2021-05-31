import { useRef, useEffect } from 'react';

import CodeMirror from 'codemirror'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/selection/mark-selection'
import 'codemirror/lib/codemirror.css'

import customHostsMode from './customHostsMode'

import './style.css';

customHostsMode()

interface EditorProps {
  readOnly?: boolean;
  content?: string;
  onChange?: (value?: string) => void;
  onBlur?: (value?: string) => void;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { readOnly, content, onChange, onBlur } = props

  const ref = useRef<HTMLTextAreaElement>(null)
  const editorRef = useRef<CodeMirror.EditorFromTextArea | null>(null)

  useEffect(() => {
    if (!ref.current) return

    let editor = CodeMirror.fromTextArea(ref.current, {
      lineNumbers: true,
      readOnly,
      // 自定义 mode
      mode: 'hosts',
    })

    editorRef.current = editor

    editor.setSize('100%', '100%')

    const blurFunc = (editor: CodeMirror.Editor) => {
      const value = editor.getDoc().getValue()
      onBlur?.(value)
    }

    const changeFunc = (editor: CodeMirror.Editor) => {
      const value = editor.getDoc().getValue()
      onChange?.(value)
    }

    editor.on('blur', blurFunc)
    editor.on('change', changeFunc)

    return () => {
      editor.off('blur', blurFunc)
      editor.off('change', changeFunc)
    }
  }, [onBlur, onChange]);

  useEffect(() => {
    if (!editorRef.current) return

    editorRef.current.setOption('readOnly', readOnly)
  }, [readOnly])

  useEffect(() => {
    editorRef.current?.setValue(content || '')
  }, [content])

  return (
    <div className="hosts_editor">
      <textarea className="hosts_editor_textarea" ref={ref}></textarea>
    </div>
  );
}

export default Editor;
