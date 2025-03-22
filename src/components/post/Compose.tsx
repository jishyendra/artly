"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/lib/actions";
import {
  type PostFormValues,
  type UrlValues,
  type SourceValues,
} from "@/lib/validation/post";
import { FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";
import UrlList from "../UrlList";
import { Select, SelectContent, SelectItem } from "../ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";

export default function CreatePostForm() {
  const [body, setBody] = useState("");
  const [urls, setUrls] = useState<UrlValues[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [selectedSource, setSelectedSource] = useState<SourceValues>("youtube");
  
  const [published, setPublished] = useState(false);

  const { pending, data, action } = useFormStatus();

  function removeUrl(index: number) {
    setUrls((urls) => [...urls.filter((_, i) => i !== index)]);
  }

  async function onSubmit(e: FormEvent, data: PostFormValues) {
    e.preventDefault();
    const filteredUrls = urls?.filter((item) => item.url.trim() !== "") || [];

    let formData = new FormData();
    formData.append("body", data.body);
    formData.append("urls", JSON.stringify(filteredUrls));
    const res = await createPost(formData);
    if (res?.success) {
      setPublished(true);
      setUrls([]);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={(e) => onSubmit(e, { body, urls })}
        className="w-ful flex flex-col gap-4"
      >
        <Textarea
          onChange={(e) => {
            setBody(e.target.value);
          }}
          value={body}
          placeholder="Type your message here."
        ></Textarea>
        <div>
          <div className="flex w-full justify-start gap-4">
            <Select
              onValueChange={(val: SourceValues) => setSelectedSource(val)}
              required
              defaultValue="youtube"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="x">X</SelectItem>
                <SelectItem value="tiktok">Tiktok</SelectItem>
                <SelectItem value="youtube">Youtube</SelectItem>
                <SelectItem value="twitch">Twitch</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="pinterest">Pinterst</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="url"
              placeholder="Add a url."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />

            <Button
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
              type="button"
              onClick={() => {
                setUrls([
                  ...urls,
                  { url: newUrl || "", source: selectedSource },
                ]);
                setNewUrl("");
              }}
            >
              Add
            </Button>
          </div>
          <UrlList urls={urls} removeUrl={removeUrl} />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 p-1 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75"
        >
          {pending ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  );
}
