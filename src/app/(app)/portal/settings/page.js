"use client";

export default function ProjectSettingsPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Project settings</h1>
            <p className="text-[14px] text-gray-500 mb-8">Manage your project configuration.</p>

            <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                    <label className="text-[13px] font-semibold text-gray-700 mb-2 block">Project name</label>
                    <input
                        type="text"
                        defaultValue="My First Site"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-300 transition-colors"
                    />
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                    <label className="text-[13px] font-semibold text-gray-700 mb-2 block">Project description</label>
                    <textarea
                        rows={3}
                        placeholder="Describe your project..."
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-300 transition-colors resize-none"
                    />
                </div>

                <div className="border border-red-100 rounded-xl p-6 bg-red-50/30">
                    <h3 className="text-[14px] font-semibold text-red-700 mb-2">Danger Zone</h3>
                    <p className="text-[13px] text-red-500 mb-4">Permanently delete this project and all its data.</p>
                    <button className="text-[13px] font-medium text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                        Delete project
                    </button>
                </div>
            </div>
        </div>
    );
}
