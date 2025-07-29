import { useState } from "react";
import { studentDataService, ResumeSuggestion } from "../../../api/studentData";
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Button from "../../../components/Button";

const ResumeTool = () => {
  // State management
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<ResumeSuggestion[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      // For now, the file name is displayed here
      setResumeText("PDF uploaded: " + file.name);
    } else {
      alert("Please upload a PDF file");
    }
  };

  // Resume analysis handler
  const handleAnalyzeResume = async () => {
    if (!resumeText.trim()) {
      alert("Please enter resume text or upload a file");
      return;
    }

    setIsAnalyzing(true);
    setSuggestions([]);

    try {
      const analysisResults =
        await studentDataService.analyzeResume(resumeText);
      setSuggestions(analysisResults);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Error analyzing resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper functions for priority display
  const getPriorityColor = (priority: ResumeSuggestion["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityIcon = (priority: ResumeSuggestion["priority"]) => {
    switch (priority) {
      case "high":
        return <CheckCircleIcon className="w-5 h-5 text-red-500" />;
      case "medium":
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case "low":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      default:
        return <LightBulbIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Resume Tool</h1>
        <p className="text-gray-600">
          Upload your resume or paste the text to get AI-powered suggestions for
          improvement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upload Resume (PDF)
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop your PDF resume here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                Choose File
              </label>
              {uploadedFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ {uploadedFile.name} uploaded
                </p>
              )}
            </div>
          </div>

          {/* Text Input */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Or Paste Resume Text
            </h3>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here for analysis..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleAnalyzeResume}
              disabled={isAnalyzing || !resumeText.trim()}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <LightBulbIcon className="w-5 h-5 mr-2" />
                  Enhance Resume
                </>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={() => setResumeText("")}
              disabled={!resumeText.trim()}
            >
              Clear Text
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            AI Suggestions
          </h3>

          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
                >
                  <div className="flex items-start">
                    {getPriorityIcon(suggestion.priority)}
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {suggestion.description}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            suggestion.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : suggestion.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {suggestion.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isAnalyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Upload your resume or paste text to get AI-powered suggestions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          💡 Resume Writing Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Use Action Verbs</h4>
            <p>
              Start bullet points with strong action verbs like "Developed",
              "Implemented", "Led", "Managed".
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Quantify Achievements</h4>
            <p>
              Include specific numbers, percentages, and metrics to demonstrate
              your impact.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Tailor to Job</h4>
            <p>
              Customize your resume for each position by highlighting relevant
              skills and experiences.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Keep it Concise</h4>
            <p>
              Limit your resume to 1-2 pages and use clear, concise language
              throughout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTool;
