import type { NextPage } from "next";
import {
  Plate,
  selectEditor,
  TElement,
  usePlateEditorRef,
  withPlateEventProvider,
} from "@udecode/plate-headless";
import { useMemo, useState } from "react";

const Toolbar = withPlateEventProvider(() => {
  const editor = usePlateEditorRef();

  return (
    <button
      onClick={() => {
        if (editor) {
          editor.insertText("hello world");
          selectEditor(editor, { edge: "end", focus: true });
        }
      }}
    >
      Klikk her
    </button>
  );
});

const Home: NextPage = () => {
  const editableProps = useMemo(
    () => ({
      placeholder: "Hello world",
    }),
    []
  );
  const [value, setValue] = useState<TElement[]>([
    { type: "p", children: [{ text: "hello world" }] },
  ]);

  return (
    <>
      <Toolbar />
      <Plate
        editableProps={editableProps}
        onChange={setValue}
        initialValue={value}
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  );
};

export default Home;
