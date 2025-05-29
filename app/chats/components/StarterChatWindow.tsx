"use client";
import { User } from "@prisma/client";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import SearchUserItem from "./SearchUserItem";
import { ArrowLeft } from "lucide-react";

interface StarterChatWindowProps {
    onBackToSidebar: () => void;
    isMobile: boolean;
}

interface StarterChatWindowHandle {
    focusInput: () => void;
}

const StarterChatWindow = forwardRef<StarterChatWindowHandle, StarterChatWindowProps>(
    ({ onBackToSidebar, isMobile }, ref) => {
        const [allUsers, setAllUsers] = useState<User[]>([]);
        const [query, setQuery] = useState("");
        const [isOpen, setIsOpen] = useState(false);

        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => ({
            focusInput: () => {
                inputRef.current?.focus();
            },
        }));

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const res = await fetch("/api/users");
                    if (!res.ok) {
                        throw new Error("Error fetching users");
                    }

                    const data = await res.json();
                    setAllUsers(data.allUsers);
                } catch (error) {
                    console.error("Error fetching users");
                }
            };

            fetchUsers();
            inputRef.current?.focus();
        }, []);

        const filteredUsers = useMemo(() => {
            if (!query.trim()) return allUsers;

            return allUsers.filter(
                (user) =>
                    user.name?.toLowerCase().includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase())
            );
        }, [allUsers, query]);

        return (
            <div className="relative h-full flex flex-col m-3">
                <div className="rounded-lg overflow-hidden border-b border-gray-300 dark:border-gray-600 flex items-center gap-2 p-2">
                    {isMobile && (
                        <div
                            className="flex items-center justify-center p-2"
                            onClick={onBackToSidebar}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </div>
                    )}
                    <p>To</p>
                    <input
                        ref={inputRef}
                        placeholder="Type here..."
                        className="focus:outline-none bg-transparent"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    />
                </div>
                {isOpen && (
                    <div className="absolute inset-0 mt-10 ml-4 p-2 space-y-1 w-[300px] max-h-[300px] bg-white dark:bg-zinc-800 overflow-y-auto rounded-lg shadow-md">
                        {!query.trim() && <p className="font-semibold my-2">All Users</p>}
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <SearchUserItem key={user.id} user={user} />
                            ))
                        ) : (
                            <p className="mt-4 text-sm text-center text-gray-500">No users found</p>
                        )}
                    </div>
                )}
                <div className="flex-1 flex items-center justify-center  text-center">
                    Start a New Chat!
                </div>
            </div>
        );
    }
);

export default StarterChatWindow;
