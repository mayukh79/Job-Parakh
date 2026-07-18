import api from "../services/api";
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import usePageReveal from '../hooks/usePageReveal';

const signalLabels = [];

export default function Analyzer() {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const eyebrowRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const floatingCardsRef = useRef(null);
    const analyzerCardRef = useRef(null);
    const reportCardRef = useRef(null);
    const scoreMeterRef = useRef(null);
    const [inputText, setInputText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisReport, setAnalysisReport] = useState(null);

    const revealRefs = useMemo(() => [
        eyebrowRef,
        titleRef,
        subtitleRef,
        floatingCardsRef,
        analyzerCardRef,
        reportCardRef,
    ], []);

    usePageReveal(pageRef, revealRefs);

    useLayoutEffect(() => {
        if (!floatingCardsRef.current) return undefined;

        const context = gsap.context(() => {
            gsap.to(floatingCardsRef.current, {
                y: -75,
                delay: 1,
                duration: 2,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
            });
        }, pageRef);

        return () => context.revert();
    }, []);

    useLayoutEffect(() => {
        if (!analysisReport || !scoreMeterRef.current) return undefined;

        const context = gsap.context(() => {
            gsap.fromTo(
                scoreMeterRef.current,
                { scaleX: 0 },
                {
                    scaleX: analysisReport.riskScore / 100,
                    duration: 1,
                    ease: 'power3.out',
                    transformOrigin: 'left center',
                },
            );
        }, reportCardRef);

        return () => context.revert();
    }, [analysisReport]);

        const handleAnalyze = async(e) => {
            e.preventDefault();
            if (!inputText.trim()) return;

            setIsAnalyzing(true);
            setAnalysisReport(null);
            try {
        const formData = new FormData();

if (selectedFile) {
    formData.append("file", selectedFile);
} else {
    formData.append("job_description", inputText);
}

const response = await api.post(
    "/analyze/",
    formData,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
);

        const data = response.data;

        setAnalysisReport({
            riskScore: data.risk_score,
            riskLevel: data.risk_level,
            reasons: data.reasons,
             mlPrediction: data.ml_prediction,
             mlConfidence: data.ml_confidence,
             aiExplanation: data.ai_explanation,
             highlightedText: data.highlighted_text,
             verificationWarnings: data.verification_warnings,
            indicators: data.reasons.map((reason) => ({
                type:
                    data.risk_level === "High"
                        ? "high"
                        : data.risk_level === "Medium"
                        ? "medium"
                        : "low",
                text: reason,
            })),
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
            charCount: inputText.length,
        });
    } catch (error) {
        console.error(error);
        alert("Failed to analyze job description.");
    } finally {
        setIsAnalyzing(false);
    }
            
        };

    const handleReset = () => {
    setInputText("");
    setSelectedFile(null);
    setAnalysisReport(null);
};

    const renderIndicatorMark = (type) => {
        if (type === 'high') return '!';
        if (type === 'medium') return '?';
        return '+';
    };

    return (
        <div ref={pageRef} className="monad-analyzer">
            <section ref={heroRef} className="monad-hero" aria-labelledby="analyzer-title">
                <div ref={eyebrowRef} className="monad-eyebrow hero-eyebrow">
                    <span />
                    <p>Job Scam Intelligence</p>
                    <span />
                </div>

                <h1 ref={titleRef} id="analyzer-title" className="hero-title">Protect Your Career Before You Apply</h1>
                <p ref={subtitleRef} className="monad-subtitle hero-subtitle">
                    Analyze job descriptions, recruiter messages, and internship offers for scam indicators.
                </p>

                <div
    ref={floatingCardsRef}
    className="monad-flow floating-card flex justify-center items-center w-full"
    aria-hidden="true"
>

    <div className="monad-flow-center mx-auto">
        <div className="monad-orbit">
            <div className="monad-node">JP</div>
        </div>
                        <div className="monad-status-row">
                            {signalLabels.map((label) => (
                                <span key={label} className="monad-status">
                                    <i />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </section>

            <section className="monad-workspace" aria-label="Job Analysis Engine">
                <div ref={analyzerCardRef} className="monad-card monad-input-card analyzer-card">
                    <div className="monad-card-header">
                        <div>
                            <p className="monad-label">Job Analysis Engine</p>
                            <h2>Paste the offer for review.</h2>
                        </div>
                        <span className="monad-version">v1.2.0-beta</span>
                    </div>

                    <form onSubmit={handleAnalyze} className="monad-form">
                        <label htmlFor="job-content" className="sr-only">Job offer text content</label>
                        <textarea
                            id="job-content"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste a job description, email offer, or message transcript here to scan for risk indicators..."
                            className="monad-textarea"
                            disabled={isAnalyzing}
                        />
                        <div className="mt-4">
                            <label htmlFor="file-upload" className="block text-sm text-gray-500 mb-2">
                                Or upload a file (TXT, PDF, DOCX)
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".txt,.pdf,.docx"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                disabled={isAnalyzing}
                                className="block w-full text-sm"
  />
  {selectedFile && (
    <p className="mt-2 text-sm text-gray-500">
        Selected: <strong>{selectedFile.name}</strong>
    </p>
)}
  
</div>

                        <div className="monad-actions">
                            <span className="monad-count">{inputText.length} characters</span>
                            <div className="monad-button-row">
                                {analysisReport && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="monad-button monad-button-ghost"
                                    >
                                        Clear
                                    </button>
                                )}
                                <button
                                    type="submit"
                                   disabled={
                                        isAnalyzing ||
                                        (!selectedFile && !inputText.trim())
                                    }
                                    className="monad-button monad-button-filled"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <span className="monad-spinner" aria-hidden="true" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Offer
                                            <span aria-hidden="true">-&gt;</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div ref={reportCardRef} className="monad-report-wrap report-card">
                    {!analysisReport && !isAnalyzing ? (
                        <div className="monad-card monad-empty-panel">
                            <p className="monad-label">Report Output</p>
                            <h3>No analysis performed yet.</h3>
                            <p>
                                Enter job advertisement or email communication content above. The Job Analysis Engine will extract threat indicators here in real-time.
                            </p>
                        </div>
                    ) : isAnalyzing ? (
                        <div className="monad-card monad-scanning-panel">
                            <div className="monad-scan-ring" aria-hidden="true" />
                            <p className="monad-label">Scanning Payload</p>
                            <h3>Parsing, verifying, and routing signals.</h3>
                            <p>Checking syntax, domains, pressure cues, and known scam patterns.</p>
                        </div>
                    ) : (
                        <div className="monad-card monad-result-panel">
                            <div className="monad-result-header">
                                <div>
                                    <p className="monad-label">Threat Report Summary</p>
                                    <h3>Analysis Output</h3>
                                </div>
                                <div className="monad-verdict">
                                    <span>Verdict</span>
                                    <strong className={analysisReport.riskColor}>
                                        {analysisReport.riskLevel} ({analysisReport.riskScore}%)
                                    </strong>
                                    <div className="mt-4 p-4 border rounded-lg">
  <h3 className="font-semibold mb-2">AI Analysis</h3>

  <p>
    <strong>Prediction:</strong> {analysisReport.mlPrediction}
  </p>

  <p>
    <strong>Confidence:</strong> {analysisReport.mlConfidence}%
  </p>
</div>
<div className="mt-4 rounded-xl border p-4">
    <h3 className="mb-3 text-xl font-semibold">
        Highlighted Job Description
    </h3>

    <div
        className="prose max-w-none whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
            __html: analysisReport.highlightedText,
        }}
    />
</div>
<div className="mt-4 rounded-xl border border-gray-300 bg-white/30 p-4">
    <h3 className="mb-3 text-xl font-semibold">
        AI Explanation
    </h3>

    <div className="max-h-72 overflow-y-auto">
        <p className="whitespace-pre-line text-sm leading-7">
            {analysisReport.aiExplanation}
        </p>
    </div>
</div>
{analysisReport.verificationWarnings?.length > 0 && (
    <div className="mt-4 rounded-xl border border-red-300 bg-red-50/40 p-4">
        <h3 className="mb-3 text-xl font-semibold text-red-700">
            Source Verification
        </h3>

        <div className="space-y-3">
            {analysisReport.verificationWarnings.map((warning, index) => (
                <div
                    key={index}
                    className="rounded-lg border border-red-200 bg-white/60 p-3"
                >
                    <p className="text-sm">
                        ⚠ {warning}
                    </p>
                </div>
            ))}
        </div>
    </div>
)}
                                    <div
                                        className="monad-score-meter"
                                        role="meter"
                                        aria-label="Risk score"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        aria-valuenow={analysisReport.riskScore}
                                    >
                                        <span ref={scoreMeterRef} className="monad-score-meter-fill" />
                                    </div>
                                </div>
                            </div>

                            <div className="monad-indicators">
                                <p className="monad-label">Flagged Indicators & Signals</p>
                                {analysisReport.indicators.map((ind, i) => (
                                    <div key={i} className="monad-indicator">
                                        <span className={`monad-indicator-mark monad-indicator-${ind.type}`}>
                                            {renderIndicatorMark(ind.type)}
                                        </span>
                                        <div>
                                            <p>{ind.text}</p>
                                            <small>Source check matches repository DB-2401</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="monad-result-footer">
                                <span>
                                    Scan processed at {analysisReport.timestamp} / {analysisReport.charCount} characters analyzed
                                </span>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="monad-link-button"
                                >
                                    Scan Another Document -&gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
