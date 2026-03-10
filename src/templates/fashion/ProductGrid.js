"use client";

import { motion } from "framer-motion";

export default function ProductGrid({ products = [], layout = "editorial" }) {
    const layouts = {
        editorial: { cols: "grid-cols-2 md:grid-cols-2", aspect: "aspect-[3/4]" },
        magazine: { cols: "grid-cols-2 md:grid-cols-3", aspect: "aspect-square" },
        minimal: { cols: "grid-cols-1 md:grid-cols-2", aspect: "aspect-[16/7]" },
    };

    const current = layouts[layout] || layouts.editorial;

    return (
        <section
            data-struxly-id="fashion-products"
            data-struxly-label="Product Grid"
            className="mb-8"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Latest Drops</h2>
                <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                    View All →
                </button>
            </div>

            <div className={`grid ${current.cols} gap-4`}>
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        data-struxly-id={`product-${product.id}`}
                        data-struxly-label={`Product: ${product.title}`}
                        className="glass rounded-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                    >
                        <div
                            className={`${current.aspect} bg-gradient-to-br ${product.gradient} group-hover:scale-105 transition-transform duration-500 relative overflow-hidden`}
                        >
                            {product.tags?.includes("new-arrival") && (
                                <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider bg-white/15 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                                    New
                                </span>
                            )}
                            {product.compareAtPrice && (
                                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                    Sale
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                                {product.vendor}
                            </p>
                            <h3 className="text-sm font-semibold text-white mb-1">{product.title}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-white font-medium">${product.price}</span>
                                {product.compareAtPrice && (
                                    <span className="text-xs text-slate-500 line-through">
                                        ${product.compareAtPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
