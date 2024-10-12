import './tiptap.scss'

import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faListOl, faListUl, faStrikethrough } from '@fortawesome/free-solid-svg-icons'

const MenuBar = forwardRef((props, ref) => {
  const { editor } = useCurrentEditor()
  const button = "btn btn-sm btn-light"
  const buttonActive = "btn btn-sm btn-light active"

  useImperativeHandle(ref, () => ({

    getHTML() {
      alert("Getting HTML");
      console.log(editor.getHTML())
    },

    getText() {
      alert("Getting Text");
      console.log(editor.getText())
    }

  }));

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? buttonActive : button}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? buttonActive : button}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? buttonActive : button}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? buttonActive : button}
        >
          Code
        </button> */}
        {/* <button className='btn btn-sm btn-light' onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button className='btn btn-sm btn-light' onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button> */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? buttonActive : button}
        >
          Normal
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? buttonActive : button}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? buttonActive : button}
        >
          H2
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? buttonActive : button}
        >
          H3
        </button> */}
        {/* <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? buttonActive : button}
        >
          H4
        </button> */}
        {/* <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? buttonActive : button}
        >
          H5
        </button> */}
        {/* <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? buttonActive : button}
        >
          H6
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? buttonActive : button}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? buttonActive : button}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? buttonActive : button}
        >
          Code block
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? buttonActive : button}
        >
          Blockquote
        </button>
        {/* <button className='btn btn-sm btn-light' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </button> */}
        {/* <button className='btn btn-sm btn-light' onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button> */}



      </div>
    </div>
  )
})

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

export default forwardRef((props, ref) => {
  const childRef = useRef()

  useImperativeHandle(ref, () => ({

    getHTML() {
      childRef.current.getHTML()
    },

    getText() {
      childRef.current.getText()
    }

  }));

  return (
    <EditorProvider slotBefore={<MenuBar ref={childRef} />} extensions={extensions} content={props.content}></EditorProvider>
  )
})