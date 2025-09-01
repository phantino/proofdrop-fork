import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ExternalLink, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApiKeysInfo() {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const hasApiKeys = !!(import.meta.env.VITE_COVALENT_API_KEY || import.meta.env.VITE_MORALIS_API_KEY);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Environment variable name copied to clipboard",
    });
  };

  if (hasApiKeys) {
    return (
      <div className="mb-4 p-3 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
        ✅ API keys configured - Real blockchain data analysis enabled
      </div>
    );
  }

  return (
    <Card className="mb-6 bg-yellow-900/20 border-yellow-500/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <AlertCircle size={20} />
          API Keys Required for Real Analysis
        </CardTitle>
        <CardDescription className="text-yellow-200">
          For accurate scoring, you need API keys from Covalent and Moralis. Without them, demo data will be used.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex gap-2 mb-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
          >
            {showDetails ? 'Hide Details' : 'Show Setup Instructions'}
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-4 text-sm">
            <div className="border border-yellow-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <Key size={16} />
                1. Get Covalent API Key (Free)
              </h4>
              <p className="text-yellow-200 mb-2">
                Provides transaction history and gas spending data for accurate wallet age and gas metrics.
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://www.covalenthq.com/platform/auth/register/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 underline"
                >
                  Sign up at Covalent <ExternalLink size={12} />
                </a>
                <div className="flex items-center gap-2">
                  <code 
                    className="bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-700"
                    onClick={() => copyToClipboard('VITE_COVALENT_API_KEY')}
                  >
                    VITE_COVALENT_API_KEY
                  </code>
                  <span className="text-xs text-gray-400">(click to copy)</span>
                </div>
              </div>
            </div>

            <div className="border border-yellow-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <Key size={16} />
                2. Get Moralis API Key (Free)
              </h4>
              <p className="text-yellow-200 mb-2">
                Provides DeFi activity, NFT transfers, and governance participation data.
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://admin.moralis.io/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 underline"
                >
                  Sign up at Moralis <ExternalLink size={12} />
                </a>
                <div className="flex items-center gap-2">
                  <code 
                    className="bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-700"
                    onClick={() => copyToClipboard('VITE_MORALIS_API_KEY')}
                  >
                    VITE_MORALIS_API_KEY
                  </code>
                  <span className="text-xs text-gray-400">(click to copy)</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-3">
              <p className="text-blue-200 text-xs">
                💡 <strong>Tip:</strong> Add these environment variables to your project settings or .env file to enable real blockchain analysis.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}