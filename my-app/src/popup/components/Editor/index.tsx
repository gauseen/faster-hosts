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
}

const Editor: React.FC<EditorProps> = (props) => {
  const { readOnly, content, onChange } = props

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

    editor.on('change', (editor) => {
      const value = editor.getDoc().getValue()
      onChange?.(value)
    })
  }, []);

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
