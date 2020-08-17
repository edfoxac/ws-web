import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

// import Editor from 'react-simple-code-editor';
import { Editor } from '@tinymce/tinymce-react';

import { Container } from './styles';

// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-css';
// import 'prismjs/themes/prism-dark.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onObsChange(texto: string): any;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  onObsChange,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [code, setCode] = useState(`${defaultValue}`);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleEditorChange = useCallback(
    (content, editor) => {
      // console.log('Content was updated:', content);
      onObsChange(content);
    },
    [onObsChange],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: editorRef.current,
      path: '_input.value',
      setValue(_: any, value: string) {
        setCode(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      <>
        <div style={{ padding: 20 }}>
          <Editor
            onFocus={handleInputFocused}
            onBlur={handleInputBlur}
            initialValue={code}
            apiKey="0miwt2j80z6fokx9witlhv92n1od0mg6n3sp9o8eejmb07wy"
            cloudChannel="5-dev"
            init={{
              height: 300,
              menubar: false,
              inline: true,
              themes: 'inlite',
              directionality: 'pt-BR',
              insert_toolbar: 'quickimage quicktable',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'image code',
              ],

              toolbar:
                'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code',
              /* without images_upload_url set, Upload tab won't show up */
              images_upload_url: 'postAcceptor.php',

              /* we override default upload handler to simulate successful upload */
              images_upload_handler(blobInfo: any, success: any, failure: any) {
                setTimeout(function () {
                  /* no matter what you upload, we will turn it into TinyMCE logo :) */
                  success(
                    'http://moxiecode.cachefly.net/tinymce/v9/images/logo.png',
                  );
                }, 1000);
              },
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </>
    </Container>
  );
};
export default Input;
