'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, runTransaction, collection, addDoc } from 'firebase/firestore';

interface TopUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CREDIT_PACKAGES = [
    { id: 'small', credits: 100, price: 5, popular: false },
    { id: 'medium', credits: 500, price: 15, popular: true },
    { id: 'large', credits: 1000, price: 25, popular: false },
];

export function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
    const { user, profile: userData } = useAuth();
    const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[1]);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [status, setStatus] = useState<{ type: 'error' | 'success' | null, message: string }>({ type: null, message: '' });

    const handlePurchase = async () => {
        if (!user) return;

        setIsPurchasing(true);
        setStatus({ type: null, message: '' });

        try {
            // Mocking a payment gateway delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const userRef = doc(db, 'users', user.uid);

            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);
                if (!userDoc.exists()) throw new Error("User does not exist!");

                const currentExtra = userDoc.data().top_up_credits || 0;
                const newExtra = currentExtra + selectedPackage.credits;

                transaction.update(userRef, {
                    top_up_credits: newExtra
                });

                const transactionRef = doc(collection(userRef, 'transactions'));
                transaction.set(transactionRef, {
                    type: 'top_up',
                    package: selectedPackage.id,
                    credits_added: selectedPackage.credits,
                    amount_paid: selectedPackage.price,
                    timestamp: new Date().toISOString()
                });
            });

            setStatus({ type: 'success', message: `Successfully added ${selectedPackage.credits} credits!` });

            // Auto close after success
            setTimeout(() => {
                onClose();
                setStatus({ type: null, message: '' });
                setIsPurchasing(false);
            }, 2000);

        } catch (error) {
            console.error('Purchase failed:', error);
            setStatus({ type: 'error', message: 'Payment failed. Please try again.' });
            setIsPurchasing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                    onClick={!isPurchasing ? onClose : undefined}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                    <button
                        onClick={onClose}
                        disabled={isPurchasing}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8">
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                            <Sparkles className="w-6 h-6" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Extra Credits</h2>
                        <p className="text-gray-500 mb-8">
                            Extra credits never expire and roll over month to month. Use them for generations, tweaks, and features when your monthly plan runs out.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {CREDIT_PACKAGES.map((pkg) => (
                                <button
                                    key={pkg.id}
                                    onClick={() => setSelectedPackage(pkg)}
                                    className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${selectedPackage.id === pkg.id
                                        ? 'border-indigo-600 bg-indigo-50/50'
                                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm whitespace-nowrap">
                                            Most Popular
                                        </div>
                                    )}
                                    <span className={`text-xl font-bold mb-1 ${selectedPackage.id === pkg.id ? 'text-indigo-900' : 'text-gray-900'}`}>
                                        {pkg.credits}
                                    </span>
                                    <span className={`text-sm font-medium ${selectedPackage.id === pkg.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                                        ${pkg.price}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {status.message && (
                            <div className={`p-3 rounded-lg text-sm font-medium mb-6 text-center ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            onClick={handlePurchase}
                            disabled={isPurchasing || status.type === 'success'}
                            className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPurchasing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : status.type === 'success' ? (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Credits Added!
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5" />
                                    Pay ${selectedPackage.price}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <p className="text-xs text-gray-500">Secure payment. Credits are instantly added to your account.</p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
