"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onCreate: (title: string) => void;
}

export default function TaskForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    if (!title.trim()) return;
    onCreate(title.trim());
    setTitle("");
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="New task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
}
