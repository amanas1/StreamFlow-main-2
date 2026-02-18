
import React from 'react';
import { Link } from 'react-router-dom';

const SEOContent: React.FC = () => {
    return (
        <section className="w-full mt-20 pt-20 border-t border-white/5 opacity-80 pb-20">
            <div className="max-w-4xl mx-auto space-y-10 px-4 text-slate-400">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
                        Global Radio Streaming & Modern Community Chat
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-500">
                        Experience the evolution of digital broadcasting with AU RadioChat. Our platform offers a seamless 
                        way to listen to <strong>online radio</strong> stations from every corner of the globe. Whether you are 
                        looking for <strong>live radio streaming</strong> or a dedicated <strong>internet radio player</strong>, 
                        we provide a high-fidelity experience without any installation required.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Discover Jazz Radio Online</h3>
                        <p className="text-sm leading-relaxed">
                            For soul seekers and smooth rhythm lovers, our collection of <strong>jazz radio online</strong> stations 
                            brings the classics and modern experimental tracks directly to your browser. From New Orleans classics 
                            to European avant-garde, the best of jazz is just one click away.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Global Radio Stations at Your Fingertips</h3>
                        <p className="text-sm leading-relaxed">
                            Traverse the globe through sound. Explore <strong>global radio stations</strong> from diverse cultures, 
                            broadcasting in real-time. Experience <strong>free music streaming</strong> across all genres: 
                            Rock, Electronic, Hip-Hop, and traditional world music.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white text-center uppercase tracking-wide">Why Choose AU RadioChat?</h3>
                    <p className="text-sm leading-relaxed">
                        AU RadioChat isn't just about passive listening; it's about connection. Our integrated <strong>smart chat</strong> 
                        allows you to interact with other listeners, share your favorite tracks, and discover new sounds together. 
                        As a lightweight <strong>internet radio player</strong>, we prioritize performance, ensuring a 
                        buffer-free experience even on mobile connections.
                    </p>
                    <p className="text-sm leading-relaxed">
                        Our library is curated to provide the most high-quality <strong>online radio</strong> feeds. We support 
                        high bitrates and diverse formats to satisfy even the most demanding audiophiles. Join thousands of 
                        active monthly listeners and start your journey through the world of digital audio today.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <Link to="/jazz-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">Jazz Radio</Link>
                    <Link to="/rock-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">Rock Radio</Link>
                    <Link to="/electronic-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">Electronic Radio</Link>
                    <Link to="/hip-hop-radio" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-300">Hip Hop Radio</Link>
                </div>
            </div>
        </section>
    );
};

export default SEOContent;
