import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@apollo/client";
import { ASK_PARTNER_AI_AGENT } from "@/apollo/user/mutation";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "next-i18next";

interface Message {
  id: string;
  text: string;
  role: "user" | "assistant";
}

const PartnerAIChatWidget = () => {
  const { t } = useTranslation("common");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: t("ai.welcomeBusiness"),
      role: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [askAgent] = useMutation(ASK_PARTNER_AI_AGENT);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, role: "user" },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const { data } = await askAgent({ variables: { question: trimmed } });
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data?.askPartnerAiAgent || "No response received.",
          role: "assistant",
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, something went wrong. Please try again.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, askAgent]);

  return (
    <Stack
      height={550}
      border="1px solid"
      borderColor="divider"
      borderRadius={2}
      overflow="hidden"
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        px={2}
        py={1.5}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <AutoAwesomeIcon sx={{ color: "white", fontSize: 22 }} />
        <Stack>
          <Typography fontWeight={700} fontSize={14} color="white">
            {t("ai.businessAssistant")}
          </Typography>
          <Typography fontSize={11} color="rgba(255,255,255,0.7)">
            {t("ai.businessPoweredBy")}
          </Typography>
        </Stack>
      </Stack>

      {/* Messages */}
      <Stack
        flex={1}
        px={2}
        py={1.5}
        gap={1.5}
        sx={{ overflowY: "auto", backgroundColor: "background.default" }}
      >
        {messages.map((msg) => (
          <Stack
            key={msg.id}
            alignItems={msg.role === "user" ? "flex-end" : "flex-start"}
          >
            {msg.role === "assistant" && (
              <Stack direction="row" gap={0.5} alignItems="center" mb={0.3}>
                <AutoAwesomeIcon sx={{ fontSize: 14, color: "primary.main" }} />
                <Typography fontSize={11} color="text.secondary" fontWeight={600}>
                  {t("ai.aiAssistant")}
                </Typography>
              </Stack>
            )}
            <Box
              sx={{
                maxWidth: "85%",
                px: 1.5,
                py: 1,
                borderRadius: 2,
                backgroundColor:
                  msg.role === "user" ? "primary.main" : "background.paper",
                color: msg.role === "user" ? "white" : "text.primary",
                border: msg.role === "user" ? "none" : "1px solid",
                borderColor: "divider",
                "& p": { margin: 0 },
                "& ul, & ol": { margin: 0, paddingLeft: "18px" },
                "& li": { fontSize: 13 },
              }}
            >
              {msg.role === "assistant" ? (
                <Typography component="div" fontSize={13} lineHeight={1.5}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </Typography>
              ) : (
                <Typography fontSize={13}>{msg.text}</Typography>
              )}
            </Box>
          </Stack>
        ))}
        {isTyping && (
          <Stack direction="row" gap={1} alignItems="center">
            <CircularProgress size={16} sx={{ color: "primary.main" }} />
            <Typography fontSize={12} color="text.secondary">
              {t("ai.analyzingData")}
            </Typography>
          </Stack>
        )}
        <div ref={messagesEndRef} />
      </Stack>

      {/* Input */}
      <Stack
        direction="row"
        gap={1}
        px={1.5}
        py={1}
        alignItems="center"
        borderTop="1px solid"
        borderColor="divider"
      >
        <TextField
          placeholder={t("ai.askBusiness")}
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5, fontSize: 13 } }}
        />
        <IconButton
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            "&:hover": { background: "linear-gradient(135deg, #5a6fd6 0%, #6a4295 100%)" },
            "&.Mui-disabled": { background: "action.disabledBackground", color: "action.disabled" },
          }}
        >
          <SendIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default PartnerAIChatWidget;
