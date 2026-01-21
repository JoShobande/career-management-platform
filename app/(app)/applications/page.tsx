'use client';

import { LoadingState } from '@/components/ui/LoadingState';
import { useApplications } from '@/providers/ApplicationProvider';


export default function ApplicationsPage() {
  const {applications, status} = useApplications()

  if (status === 'loading'){
    return <LoadingState/>
  }

  if (applications.length === 0){
    return <div>No applications</div>
  }


  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Applications
        </h1>
        <p className="text-sm text-gray-500">
          Track and manage your job applications
        </p>
      </div>
      {applications.map((application) => (
        <div
          key={application.id}
          className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition"
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

            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                application.status === 'active'
                  ? 'bg-blue-50 text-blue-700'
                  : application.status === 'offer'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {application.status}
            </span>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Applied on {application.dateApplied}
          </div>
        </div>
      ))}
    </div>
  );
}
