"use client";

import { useState, DragEvent, ChangeEvent } from "react";
import {
  UploadCloud,
  File,
  CheckCircle,
  Loader2,
  Download,
  XCircle,
  RefreshCw,
} from "lucide-react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState("STL (Stereolithography)");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formats = [
    "STL (Stereolithography)",
    "OBJ (Wavefront)",
    "FBX (FilmBox)",
    "PLY (Polygon File Format)",
    "3MF (3D Manufacturing Format)",
    "ZIP (Archive)",
    "USDZ (Universal Scene Description)",
  ];

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    setError(null);
    setDone(false);

    const f = e.dataTransfer.files[0];
    if (f && f.name.toLowerCase().endsWith(".glb")) {
      setFile(f);
    } else {
      setError("Only GLB files are accepted.");
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setDone(false);
    const f = e.target.files?.[0];
    if (f && f.name.toLowerCase().endsWith(".glb")) {
      setFile(f);
    } else if (f) {
      setError("Only GLB files are accepted.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setDone(false);
    setLoading(false);
    setError(null);
  };

  const handleConvert = () => {
    if (!file) return;

    setLoading(true);
    setDone(false);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      
      if (Math.random() < 0.1) {
         setError("Conversion failed. Try a different format or file.");
      } else {
         setDone(true);
      }
    }, 2500);
  };

  const formatShort = format.split(" ")[0]; 
  return (
    
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl opacity-40 animate-pulse-slow delay-1000"></div>

      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-3xl p-12 relative z-10 transition-all duration-500 hover:shadow-lime-500/30">

        <header className="text-center mb-12">
         
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 tracking-tight leading-snug">
            Universal 3D Model Converter
          </h1>
          <p className="text-white/70 mt-3 text-xl font-light">
            Seamlessly transform your GLB models into any major 3D format.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white/90 border-b border-white/10 pb-2">
                1. Upload Your File
            </h2>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative rounded-xl border-4 p-10 text-center transition-all duration-300 min-h-[180px] flex flex-col justify-center items-center
                ${dragging
                 
                  ? "border-lime-400 bg-lime-500/10 shadow-lg shadow-lime-500/20 scale-[1.01]"
                  : "border-white/10 hover:border-lime-500/50 bg-white/5"
                }
              `}
            >
              <UploadCloud className={`h-12 w-12 ${file ? 'text-lime-600' : 'text-lime-400 animate-fadeIn'}`} />

              {!file ? (
                <>
                  <p className="text-white mt-4 text-xl font-medium">
                    Drag & drop your <span className="text-lime-400 font-bold">GLB</span> file
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    or click to browse. Max size 250MB.
                  </p>
                  <input
                    type="file"
                    accept=".glb"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleSelect}
                  />
                </>
              ) : (
                <div className="mt-4 w-full flex flex-col items-center justify-center gap-2 text-white animate-fadeIn">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg w-full max-w-sm">
                    <File className="text-lime-400 flex-shrink-0" />
                    <span className="truncate flex-grow text-lg">{file.name}</span>
                    <button
                        onClick={clearFile}
                        className="text-white/50 hover:text-red-400 transition"
                        title="Remove file"
                    >
                        <XCircle size={20} />
                    </button>
                  </div>
                  <span className="text-sm text-white/60">Ready to convert.</span>
                </div>
              )}
            </div>
            
            {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
                    <XCircle size={20} />
                    <span className="text-sm">{error}</span>
                </div>
            )}
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white/90 border-b border-white/10 pb-2">
                2. Select Output & Convert
            </h2>

            <div>
              <label htmlFor="output-format" className="text-lg text-white/70 block mb-3 font-medium">
                Target Format
              </label>
              <select
                id="output-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white text-lg transition duration-300 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 appearance-none"
              >
                {formats.map((f) => (
                  <option key={f} value={f} className="bg-zinc-800 p-2">{f}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleConvert}
              disabled={!file || loading || done}
              className={`w-full py-4 rounded-xl font-extrabold text-xl tracking-wide transition-all duration-300 shadow-xl
                ${file && !loading && !done
                
                  ? "bg-gradient-to-r from-lime-600 to-emerald-600 text-black hover:from-lime-500 hover:to-emerald-500 shadow-lime-600/40 transform hover:-translate-y-0.5"
                  : "bg-white/10 text-white/40 cursor-not-allowed shadow-none"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin h-6 w-6" />
                  Processing to {formatShort}...
                </span>
              ) : done ? (
                 <span className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6" />
                    Conversion Complete!
                </span>
              ) : (
                `Convert to ${formatShort}`
              )}
            </button>
         
            {done && (
              
              <div className="p-5 border border-lime-500/50 bg-green-900/30 rounded-xl text-white animate-fadeIn">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-lime-400 h-6 w-6" />
                        <span className="text-lg font-semibold text-lime-300">
                            Download Your Model
                        </span>
                    </div>
                    <button
                        
                        className="flex items-center gap-2 bg-lime-600 hover:bg-lime-500 text-black font-bold py-2 px-4 rounded-lg transition duration-300"
                        onClick={() => alert(`Simulating download of ${file!.name.split(".")[0]}.${formatShort.toLowerCase()}`)}
                    >
                        <Download size={20} />
                        Download .{formatShort}
                    </button>
                </div>
                <div className="mt-3 text-sm text-white/70 flex justify-between items-center">
                    <span>File: {file?.name.split(".")[0]}.{formatShort.toLowerCase()}</span>
                    <button onClick={clearFile} className="flex items-center gap-1 text-lime-400 hover:text-lime-300 transition">
                        Convert another <RefreshCw size={14} />
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
