"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type BibtexCopyButtonProps = {
    bibtex: string;
    idleText?: string;
    copiedText?: string;
} & Omit<React.ComponentProps<typeof Button>, "onClick" | "children">;

export function BibtexCopyButton({
    bibtex,
    idleText = "BibTeX",
    copiedText = "Copied!",
    ...buttonProps
}: BibtexCopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(bibtex);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <Button onClick={handleCopy} {...buttonProps}>
            <Copy className="h-3.5 w-3.5 mr-1" />
            {copied ? copiedText : idleText}
        </Button>
    );
}
