"use client";

import { LoadingState } from "@/components/ui/LoadingState";
import { useApplications } from "@/providers/ApplicationProvider";
import { useState } from "react";
import type { JobApplicationStatus } from "@/lib/application/types";
import { Modal } from "@/components/ui/Modal";

export default function ApplicationsPage() {
  const {
    applications,
    status,
    addApplication,
    deleteApplication,
    updateApplication,
  } = useApplications();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [roleName, setRoleName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [appStatus, setAppStatus] = useState<JobApplicationStatus>("active");
  const [dateApplied, setDateApplied] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "offer" | "rejected"
  >("all");

  const visibleApplications = applications
    .filter((application) =>
      statusFilter === "all" ? true : application.status === statusFilter,
    )
    .filter((application) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      return (
        application.companyName.toLowerCase().includes(q) ||
        application.roleName.toLowerCase().includes(q)
      );
    });

  const resetForm = () => {
    setRoleName("");
    setCompanyName("");
    setAppStatus("active");
    setDateApplied("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      roleName: roleName.trim(),
      companyName: companyName.trim(),
      status: appStatus,
      dateApplied,
    };

    if (editId === null) {
      addApplication(input);
    } else {
      updateApplication(editId, input);
    }

    resetForm();
    setOpen(false);
  };

  const closeForm = () => {
    setOpen(false);
    resetForm();
    setEditId(null);
  };

  if (status === "loading") {
    return <LoadingState />;
  }

  return (
    <>
      <Modal
        open={open}
        title={editId ? "Edit Application" : "Add Application"}
        onClose={() => setOpen(false)}
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Role name
            </label>
            <input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Frontend Engineer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Company</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Acme Inc."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={appStatus}
                onChange={(e) =>
                  setAppStatus(e.target.value as JobApplicationStatus)
                }
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="active">Active</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Date applied
              </label>
              <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeForm}
              className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
              disabled={!roleName.trim() || !companyName.trim() || !dateApplied}
            >
              {editId ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      <div className="space-y-4">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Applications
            </h1>
            <p className="text-sm text-gray-500">
              Track and manage your job applications.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search role or company"
              className="w-full sm:w-64 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
              className="w-full sm:w-auto rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add application
            </button>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-white p-8 text-center">
            <p className="text-sm font-medium text-gray-900">
              No applications yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Click <span className="font-medium">Add application</span> to log
              your first one.
            </p>
          </div>
        ) : visibleApplications.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-white p-8 text-center">
            <p className="text-sm font-medium text-gray-900">
              No matches found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Try a different search term or change the status filter.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Clear search
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Reset filter
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleApplications.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      {application.roleName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {application.companyName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        application.status === "active"
                          ? "bg-blue-50 text-blue-700"
                          : application.status === "offer"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {application.status}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditId(application.id);
                        setRoleName(application.roleName);
                        setCompanyName(application.companyName);
                        setAppStatus(application.status);
                        setDateApplied(application.dateApplied);
                        setOpen(true);
                      }}
                      className="rounded-md border border-transparent px-2 py-1 text-xs font-medium text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      aria-label={`Edit ${application.roleName} at ${application.companyName}`}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const ok = confirm("Delete this application?");
                        if (ok) deleteApplication(application.id);
                      }}
                      className="rounded-md border border-transparent px-2 py-1 text-xs font-medium text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                      aria-label={`Delete ${application.roleName} at ${application.companyName}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Applied on {application.dateApplied}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
