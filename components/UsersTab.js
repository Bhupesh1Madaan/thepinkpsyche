import { useState } from "react";

export default function UsersTab() {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", role: "Editor" },
        { id: 2, name: "Jane Smith", role: "Contributor" },
        { id: 3, name: "Alice Johnson", role: "Viewer" },
    ]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
