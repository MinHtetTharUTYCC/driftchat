"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchBox({
    onActive,
    onCancel,
    onQueryChange,
}: {
    onActive: () => void;
    onCancel: () => void;
    onQueryChange: (q: string) => void;
}) {
    const [isFocused, setIsFocused] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");

    const onSearchBoxClear = () => {
        setQuery("");
        onQueryChange("");
        if (searchRef.current) {
            searchRef.current.value = "";
            searchRef.current.focus();
        }
    };

    return (
        <div className="flex items-center gap-1 mx-2">
            {isFocused && (
                <div
                    className="p-2 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-zinc-600"
                    onClick={() => {
                        setQuery("");
                        setIsFocused(false);
                        if (searchRef.current) {
                            //for x to be invisible
                            searchRef.current.value = "";
                        }
                        onCancel();
                    }}
                >
                    <ArrowLeft className="h-6 w-6" />
                </div>
            )}

            <form
                className="flex-1 p-1 flex items-center justify-between rounded-full
                 bg-gray-200 dark:bg-zinc-700  hover:bg-transparent dark:hover:bg-transparent 
                 border border-transparent hover:border-gray-400 dark:hover:border-gray-600"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Input
                    ref={searchRef}
                    type="text"
                    placeholder="Search DriftChat"
                    className="font-semibold border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none 
                    bg-transparent dark:bg-transparent !placeholder-gray-400 !dark:placeholder-gray-400"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.currentTarget.value);
                        onQueryChange(e.currentTarget.value);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        onActive();
                    }}
                    // onBlur={() => setIsFocused(false)}
                />

                <div
                    className={`flex items-center justify-center bg-gray-200 dark:bg-zinc-600 p-2 rounded-full cursor-pointer  ${
                        query.trim() === "" ? "invisible" : "visible"
                    }`}
                    onClick={onSearchBoxClear}
                >
                    <X size={22} className={`text-muted-foreground hover:text-primary `} />
                </div>
            </form>
        </div>
    );
}

export default SearchBox;
