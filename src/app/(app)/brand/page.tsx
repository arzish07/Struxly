'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function BrandProfilePage() {
    const { user, profile: userData } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Basic validation
        if (file.size > 2 * 1024 * 1024) {
            setStatusMessage({ type: 'error', text: 'File size must be less than 2MB' });
            return;
        }

        if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
            setStatusMessage({ type: 'error', text: 'Only JPG, PNG, and SVG files are allowed' });
            return;
        }

        try {
            setUploading(true);
            setStatusMessage({ type: '', text: '' });

            // 1. Upload to Storage
            const fileRef = ref(storage, `users/${user.uid}/brand/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            const downloadUrl = await getDownloadURL(fileRef);

            // 2. Update Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                assets: arrayUnion(downloadUrl)
            });

            setStatusMessage({ type: 'success', text: 'Brand logo uploaded successfully!' });
        } catch (error) {
            console.error('Upload Error:', error);
            setStatusMessage({ type: 'error', text: 'Authentication required or upload failed.' });
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteAsset = async (assetUrl: string) => {
        if (!user || !userData) return;

        try {
            // Delete from Firestore array
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                assets: arrayRemove(assetUrl)
            });

            // Note: In a full production app we would also delete the object from Storage
            // using the original ref, but we are keeping it simple for MVP.

            setStatusMessage({ type: 'success', text: 'Logo removed.' });
        } catch (error) {
            console.error('Delete Error:', error);
            setStatusMessage({ type: 'error', text: 'Failed to remove logo.' });
        }
    };

    if (!user) return <div className="p-12 text-center text-gray-500">Please log in to manage your brand profile.</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Profile</h1>
                <p className="text-gray-500">Manage your logos and brand assets that Struxly AI will use across your generated sites.</p>
            </header>

            {statusMessage.text && (
                <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 ${statusMessage.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    {statusMessage.type === 'error' ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                    <span className="text-sm font-medium">{statusMessage.text}</span>
                </div>
            )}

            <section className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-8 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">Company Logos</h2>
                    <p className="text-sm text-gray-500 mb-6">Upload your primary logo. The AI will automatically place it in the navigation bars and footers of your generated projects.</p>

                    <div className="flex flex-col sm:flex-row gap-8 items-start">
                        {/* Upload Dropzone */}
                        <div className="w-full sm:w-72">
                            <label
                                htmlFor="logo-upload"
                                className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden
                                    ${uploading ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-300'}
                                `}
                            >
                                <input
                                    id="logo-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/svg+xml"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                {uploading ? (
                                    <div className="flex flex-col items-center gap-2 text-indigo-600">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span className="text-sm font-semibold">Uploading...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3 text-center p-6">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-1">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-indigo-600 block">Click to upload</span>
                                            <span className="text-xs text-gray-500">SVG, PNG, or JPG (max. 2MB)</span>
                                        </div>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Existing Logos Grid */}
                        <div className="flex-1 w-full">
                            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Your Assets</h3>

                            {userData?.assets?.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {userData.assets.map((url: string, idx: number) => (
                                        <div key={idx} className="relative group aspect-square rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={url}
                                                alt={`Brand Logo ${idx}`}
                                                fill
                                                className="object-contain p-4 group-hover:scale-95 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                                                <button
                                                    onClick={() => handleDeleteAsset(url)}
                                                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-48 border border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                        <Image src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E" alt="Empty" width={24} height={24} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">No logos yet</span>
                                    <span className="text-xs text-gray-500 mt-1">Upload a logo to see it here</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
