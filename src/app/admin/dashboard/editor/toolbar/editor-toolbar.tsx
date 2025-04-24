/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { Editor } from "@tiptap/react"
import {
    AlignCenter,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignJustifyIcon,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Image,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, Toolbar } from "@/components/toolbar"
import { FormatType } from "./format-type"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ToolButton from "./tool-button"
import TextAlign from "@tiptap/extension-text-align"

interface EditorToolbarProps {
  editor: Editor
  onImageSelection?(): void
}

const EditorToolbar = ({ editor, onImageSelection }: EditorToolbarProps) => {
  return (<div>
    <Toolbar className="m-0 flex items-center justify-between p-2" aria-label="Formatting options">
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}>
            <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic">
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}>
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}>
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive("orderedList")}>
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleCodeBlock({language: 'python'}).run()}
          pressed={editor.isActive("codeBlock")}>
          <Code className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive("blockquote")}>
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </Toggle>

        <FormatType editor={editor} />
      </ToggleGroup>
      <div className="flex flex-row justify-between">
        <ToolButton onClick={() => editor.chain().focus().setTextAlign("left").run()} 
        active={editor?.isActive({textAlign: "left"})}>
            <AlignLeft className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().setTextAlign("center").run()} 
        active={editor?.isActive({textAlign: "center"})}>
            <AlignCenter className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().setTextAlign("right").run()} 
        active={editor?.isActive({textAlign: "right"})}>
            <AlignRight className="h-4 w-4" />
        </ToolButton>
      </div>
    </Toolbar>
    <Toolbar>
      <ToggleGroup className="flex flex-row items-center invisible sm:visible" type="multiple">
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Toggle>
      <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => onImageSelection && onImageSelection()}>
          <Image className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </Toolbar></div>
  )
}

export default EditorToolbar