"use client";
import React, { useEffect, useMemo, useState } from "react";
import SearchUserItem from "./SearchUserItem";
import { User } from "@prisma/client";
import { RefreshCw, Search } from "lucide-react";

function SearchList({ query }: { query: string }) {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [isMessageSearch, setIsMessageSearch] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/users");
                if (!res.ok) {
                    throw new Error("Error fetching users");
                }

                const data = await res.json();
                setAllUsers(data.allUsers);
            } catch (error) {
                console.error("Error fetching users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        if (!query.trim()) return allUsers;

        return allUsers.filter(
            (user) =>
                user.name?.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
        );
    }, [allUsers, query]);

    if (allUsers.length === 0 && !loading) return <div>No Users Found.</div>;

    return (
        <div className="mt-2">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="animate-spin h-6 w-6" />
                </div>
            ) : (
                <div>
                    {!query.trim()
                        ? !isMessageSearch && (
                              <p className="font-semibold text-gray-600 dark:text-gray-400 mb-2 px-4">
                                  All Users
                              </p>
                          )
                        : !isMessageSearch && (
                              <div
                                  className="flex items-center justify-start gap-2 p-2 hover:bg-stone-200 rounded-l-xl cursor-pointer"
                                  onClick={() => setIsMessageSearch(true)}
                              >
                                  <div className="flex items-center justify-center p-2 bg-gray-300 rounded-full">
                                      <Search className="h-6 w-6" />
                                  </div>
                                  <h1 className="flex-1 text-md line-clamp-1">
                                      Search Messages for {query}
                                  </h1>
                              </div>
                          )}

                    {isMessageSearch ? (
                        <div>Search messages...</div>
                    ) : (
                        <>
                            {filteredUsers.map((user) => (
                                <SearchUserItem key={user.id} user={user} />
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchList;
