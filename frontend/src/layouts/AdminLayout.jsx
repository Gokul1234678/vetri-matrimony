import { useState } from "react";

import "../assets/css/admin/layout.css";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import AdminFooter from "../components/admin/AdminFooter";

function AdminLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="admin-layout">

            <AdminSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {

                sidebarOpen && (

                    <div

                        className="admin-backdrop"

                        onClick={() =>

                            setSidebarOpen(false)

                        }

                    />

                )

            }

            <div className="admin-main">

                <AdminTopbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="admin-content">

                    {children}

                </main>

                <AdminFooter />

            </div>

        </div>

    );

}

export default AdminLayout;