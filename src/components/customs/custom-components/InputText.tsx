import React, { Attributes, HtmlHTMLAttributes, ReactElement, ReactNode, useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  BaseEditor,
} from 'slate';
import { withHistory } from 'slate-history';

import { Button, Icon, Toolbar} from './components'
import { FaPlus } from 'react-icons/fa';
import { FaBold } from 'react-icons/fa';
import { FaItalic } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { FaHeading } from 'react-icons/fa';
import { FaQuoteLeft } from 'react-icons/fa';
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight, MdFormatListBulleted, MdFormatListNumbered, MdFormatQuote, MdLooksOne, MdLooksTwo } from 'react-icons/md';
import { IconType } from 'react-icons';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const InputText = () => {
  const renderElement = useCallback((props: JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={[]}>
      <Toolbar>
        <MarkButton format="bold" icon={<FaBold />} />
        <MarkButton format="italic" icon={<FaItalic />} />
        <MarkButton format="underline" icon={<FaUnderline/>} />
        <MarkButton format="code" icon={<FaCode/>} />
        <BlockButton format="heading-one" icon={<MdLooksOne/>} />
        <BlockButton format="heading-two" icon={<MdLooksTwo/>} />
        <BlockButton format="block-quote" icon={<MdFormatQuote/>} />
        <BlockButton format="numbered-list" icon={<MdFormatListNumbered/>} />
        <BlockButton format="bulleted-list" icon={<MdFormatListBulleted/>} />
        <BlockButton format="left" icon={<MdFormatAlignLeft/>} />
        <BlockButton format="center" icon={<MdFormatAlignCenter/>} />
        <BlockButton format="right" icon={<MdFormatAlignRight/>} />
        <BlockButton format="justify" icon={<MdFormatAlignJustify />} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark =  HOTKEYS[hotkey as keyof typeof HOTKEYS]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor: Editor, format: string) => {

  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n:any) =>{
      return !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(format) &&
      !TEXT_ALIGN_TYPES.includes(format)},
    split: false,
  })
  let newProperties: any
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: any, blockType:any = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n:any) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof typeof n] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format as keyof typeof marks] === true : false
}

const Element = ({ attributes, children, element }:{attributes:any, children: ReactNode, element:any}) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }:{attributes:Attributes, children: ReactNode, leaf: any}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }:{format:string, icon:ReactElement}) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}

const MarkButton = ({ format, icon }:{format:string, icon:ReactElement}) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {icon}
      
    </Button>
  )
}

const initialValue: any[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default InputText
