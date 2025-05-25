import React from "react";

function ProfilePage({ params }: { params: { userId: string } }) {
    const { userId } = params;
    return <div>Hi User {userId}</div>;
}

export default ProfilePage;
