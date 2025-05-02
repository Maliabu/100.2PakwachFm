/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from '@tiptap/extension-text-align'
import CodeBlock from "@tiptap/extension-code-block"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import {all, createLowlight} from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'


import EditorToolbar from "./toolbar/editor-toolbar"
import React from "react"
import ImageGallery from "./imageGallery"
import { deleteEditorFile } from "@/server/fetch.actions"
import ImageProvider from "./context/imageProvider"

const lowlight = createLowlight(all)

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('python', python)

interface EditorProps {
  content: string
  placeholder?: string
  onChange: (value: string) => void
}
function path(imagePath: string){
  return "/editor/"+imagePath
}

const Editor = ({ content, placeholder, onChange,  }: EditorProps) => {
  const [showImageGallery, setShowImageGallery] = React.useState(false)
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({
        codeBlock: false
    }), TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['center', 'left', 'right'],
      }), CodeBlockLowlight.configure({
        lowlight,
      }), Placeholder.configure({
        placeholder: "Write your article here..."
      }), Image.configure({
        inline: false,
        HTMLAttributes:{
          class: 'w-full aspect-square h-80 py-6'
        }
      })],
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-screen admin',
        }
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })
  const onImageSelect = (image: string) => {
      editor?.chain().setImage({src: path(image), alt: "Editor image"}).run()
  }

  // for after updating useeffect
  // editor?.commands.setContent(" ")

  if (!editor) return <></>
  console.log(editor.getHTML())

  return (
    <ImageProvider>
    <div className="prose max-w-none w-full border border-input bg-background text-foreground dark:prose-invert">
      <EditorToolbar editor={editor} onImageSelection={() => setShowImageGallery(true)} />
      <div className="editor">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
      <ImageGallery 
      visible={showImageGallery} 
      onClose={setShowImageGallery} 
      onSelect={onImageSelect}
      />
    </div>
    </ImageProvider>
  )
}

export default Editor