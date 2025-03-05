import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  DecoupledEditor,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  Bookmark,
  BalloonToolbar,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  WordCount,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "./style.css";
import { useDiff } from "@/shared/stores/useDiff";
import * as S from "./WriteHeader/style";
import Timer from "tiny-timer";

// const LICENSE_KEY = import.meta.env.VITE_CKEDITOR_LICENSE_KEY;
const LICENSE_KEY = "GPL";

export default function CKEditorComponent() {
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const { hashed_id } = useParams();
  const timer = new Timer();

  interface editorOriginDataType {
    title: string;
    content: string;
    hashed_id: string;
    updated_at: string;
  }

  const [editorOriginData, setEditorOriginData] = useState<editorOriginDataType>({
    title: "",
    content: "",
    hashed_id: "",
    updated_at: "",
  });

  timer.on("done", () => console.log("done"));

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/files/${hashed_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const data = await response.json();
        setEditorOriginData(data);
        console.log(data);
        // CKEditor 준비 완료
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);      
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);


  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertTable",
            "|",
            "alignment",
            "|",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          Base64UploadAdapter,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          BalloonToolbar,
          Essentials,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          FullPage,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Mention,
          PageBreak,
          Paragraph,
          PasteFromMarkdownExperimental,
          PasteFromOffice,
          RemoveFormat,
          ShowBlocks,
          SourceEditing,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          TodoList,
          Underline,
          WordCount,
        ],
        balloonToolbar: ["bold", "italic", "|", "link"],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        initialData: `${editorOriginData.content}`,
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        menuBar: {
          isVisible: true,
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);


    return (
      <div className="main-container">
        <div
          className="editor-container editor-container_document-editor editor-container_include-word-count"
          ref={editorContainerRef}
        >
          <S.WriteHeader>
            <p className="title">{editorOriginData.title}</p>
            <div className="editor-container__menu-bar" ref={editorMenuBarRef}></div>
          </S.WriteHeader>
          <div className="editor-container__toolbar" ref={editorToolbarRef}></div>
          <div className="editor-container__editor-wrapper">
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {editorConfig && (
                  <CKEditor
                    onReady={(editor) => {
                      const wordCount = editor.plugins.get("WordCount");

                      // 파일 데이터 변경 감지
                      editor.model.document.on('change:data', () => {
                        const data = editor.getData();
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(data, 'text/html');
                        const bodyContent = doc.body ? doc.body.innerHTML : '';
                        // 각 태그에 ID를 부여하는 함수
                        const addIdsToElements = (htmlString: string) => {
                          const parser = new DOMParser();
                          const doc = parser.parseFromString(htmlString, 'text/html');
                          const allElements = doc.body.querySelectorAll('*');
                        
                          allElements.forEach((element, index) => {
                          if (!element.id) {
                            element.setAttribute('id', `e-${index}`);
                          }
                          });
                        
                          return doc.body.innerHTML;
                        };
                        
                        // bodyContent에 ID 추가
                        const bodyWithIds = addIdsToElements(bodyContent);
                        
                        // CKEditor 5의 content 추출 (ID가 추가된 HTML)
                        console.log('Editor content changed:', bodyWithIds);
                        // CKditor 5의 content 추출
                        // console.log('Editor content changed:', bodyContent);
                      });
                      editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
                      editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element);
                      editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);
                    }}
                    onAfterDestroy={() => {
                      Array.from(editorWordCountRef.current.children).forEach((child) =>
                        child.remove()
                      );
                      Array.from(editorToolbarRef.current.children).forEach((child) =>
                        child.remove()
                      );
                      Array.from(editorMenuBarRef.current.children).forEach((child) =>
                        child.remove()
                      );
                  }}
                  editor={DecoupledEditor}
                  config={editorConfig}
                  onChange={()=>timer.start(3000)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="editor_container__word-count" ref={editorWordCountRef}></div>
      </div>
    </div>
  );
}
