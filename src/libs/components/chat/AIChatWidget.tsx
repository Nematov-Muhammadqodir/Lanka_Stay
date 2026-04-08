import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useLazyQuery } from "@apollo/client";
import { ASK_AI_AGENT } from "@/apollo/user/query";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "next-i18next";

interface Message {
  id: string;
  text: string;
  role: "user" | "assistant";
  createdAt: Date;
}

const AIChatWidget = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: t("ai.welcome"),
      role: "assistant",
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [askAiAgent] = useLazyQuery(ASK_AI_AGENT, {
    fetchPolicy: "network-only",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      role: "user",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const { data, error } = await askAiAgent({
        variables: { question: trimmed },
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          error?.message ||
          data?.askAiAgent ||
          "Sorry, I couldn't process that. Please try again.",
        role: "assistant",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong. Please try again.",
        role: "assistant",
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, askAiAgent]);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 90 },
            zIndex: 1300,
            width: 56,
            height: 56,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd6 0%, #6a4295 100%)",
            },
          }}
        >
          <AutoAwesomeIcon sx={{ color: "white" }} />
        </Fab>
      )}

      {/* Chat Window */}
      {open && (
        <Stack
          sx={{
            position: "fixed",
            bottom: { xs: 0, md: 24 },
            right: { xs: 0, md: 90 },
            left: { xs: 0, md: "auto" },
            top: { xs: 0, md: "auto" },
            width: { xs: "100%", md: 400 },
            height: { xs: "100%", md: 550 },
            zIndex: 1300,
            borderRadius: { xs: 0, md: 3 },
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1.5}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <Stack direction="row" alignItems="center" gap={1.5}>
              <AutoAwesomeIcon sx={{ color: "white", fontSize: 22 }} />
              <Stack>
                <Typography fontWeight={700} fontSize={14} color="white">
                  {t("ai.travelAssistant")}
                </Typography>
                <Typography fontSize={11} color="rgba(255,255,255,0.7)">
                  {t("ai.poweredBy")}
                </Typography>
              </Stack>
            </Stack>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
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
                    <AutoAwesomeIcon
                      sx={{ fontSize: 14, color: "primary.main" }}
                    />
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
                    border:
                      msg.role === "user" ? "none" : "1px solid",
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
                    <Typography fontSize={13} lineHeight={1.5}>
                      {msg.text}
                    </Typography>
                  )}
                </Box>
                <Typography fontSize={10} color="text.disabled" mt={0.2} px={0.5}>
                  {msg.createdAt.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Stack>
            ))}

            {isTyping && (
              <Stack direction="row" gap={1} alignItems="center" px={0.5}>
                <CircularProgress size={16} sx={{ color: "primary.main" }} />
                <Typography fontSize={12} color="text.secondary">
                  {t("ai.searching")}
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
              placeholder={t("ai.askAbout")}
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
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 5, fontSize: 13 },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd6 0%, #6a4295 100%)",
                },
                "&.Mui-disabled": {
                  background: "action.disabledBackground",
                  color: "action.disabled",
                },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AIChatWidget;
