// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Eye, Calendar, ExternalLink } from "lucide-react";
// import { format } from 'date-fns';
// import { Link } from 'react-router-dom';
// import { createPageUrl } from '@/utils';
// import { Skeleton } from "@/components/ui/skeleton";

// export default function RecentUploads({ images, isLoading }) {
//     if (isLoading) {
//         return (
//             <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//                 <CardHeader>
//                     <CardTitle className="text-xl font-bold text-slate-900">Recent Uploads</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {Array(6).fill(0).map((_, i) => (
//                             <div key={i} className="space-y-3">
//                                 <Skeleton className="h-32 w-full rounded-xl" />
//                                 <Skeleton className="h-4 w-3/4" />
//                                 <Skeleton className="h-3 w-1/2" />
//                             </div>
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-xl font-bold text-slate-900">Recent Uploads</CardTitle>
//                 {images.length > 0 && (
//                     <Link to={createPageUrl("Gallery")}>
//                         <Button variant="outline" size="sm" className="border-2">
//                             View All
//                             <ExternalLink className="w-4 h-4 ml-2" />
//                         </Button>
//                     </Link>
//                 )}
//             </CardHeader>
//             <CardContent>
//                 {images.length === 0 ? (
//                     <div className="text-center py-12">
//                         <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
//                             <Eye className="w-8 h-8 text-slate-400" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-slate-900 mb-2">No images yet</h3>
//                         <p className="text-slate-500 mb-6">Upload your first image to get started</p>
//                         <Link to={createPageUrl("Upload")}>
//                             <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
//                                 Upload Image
//                             </Button>
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <AnimatePresence>
//                             {images.map((image, index) => (
//                                 <motion.div
//                                     key={image.id}
//                                     initial={{ opacity: 0, scale: 0.9 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 0.9 }}
//                                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                                     className="group"
//                                 >
//                                     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                                         <div className="aspect-square overflow-hidden bg-slate-100">
//                                             <img
//                                                 src={image.file_url}
//                                                 alt={image.filename}
//                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                             />
//                                         </div>
//                                         <div className="p-4 space-y-2">
//                                             <h4 className="font-semibold text-slate-900 truncate text-sm">
//                                                 {image.filename}
//                                             </h4>
//                                             <div className="flex items-center gap-2 text-xs text-slate-500">
//                                                 <Calendar className="w-3 h-3" />
//                                                 {format(new Date(image.created_date), 'MMM d, yyyy')}
//                                             </div>
//                                             {image.ai_description && (
//                                                 <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
//                                                     AI Analyzed
//                                                 </Badge>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </AnimatePresence>
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     );
// }