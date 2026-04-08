import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Box,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  GET_OR_CREATE_CONVERSATION,
  GET_CONVERSATION_MESSAGES,
} from "@/apollo/user/query";
import { SEND_MESSAGE } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { sweetMixinErrorAlert } from "../../sweetAlert";
import { useTranslation } from "next-i18next";

interface ChatWidgetProps {
  ownerId: string;
  ownerName: string;
  propertyId?: string;
  attractionId?: string;
}

const ChatWidget = ({
  ownerId,
  ownerName,
  propertyId,
  attractionId,
}: ChatWidgetProps) => {
  const { t } = useTranslation("common");
  const user = useReactiveVar(userVar);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [getOrCreate] = useLazyQuery(GET_OR_CREATE_CONVERSATION, {
    fetchPolicy: "network-only",
  });
  const [getMessages] = useLazyQuery(GET_CONVERSATION_MESSAGES, {
    fetchPolicy: "network-only",
  });
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll for new messages when open
  useEffect(() => {
    if (!open || !conversationId) return;
    const interval = setInterval(async () => {
      const { data } = await getMessages({
        variables: { conversationId },
      });
      if (data) setMessages(data.getConversationMessages);
    }, 3000);
    return () => clearInterval(interval);
  }, [open, conversationId]);

  const handleOpen = async () => {
    if (!user?._id) {
      await sweetMixinErrorAlert("Please login first");
      return;
    }
    setOpen(true);

    const { data } = await getOrCreate({
      variables: {
        receiverId: ownerId,
        propertyId: propertyId || null,
        attractionId: attractionId || null,
      },
    });

    if (data?.getOrCreateConversation) {
      const convId = data.getOrCreateConversation._id;
      setConversationId(convId);

      const { data: msgData } = await getMessages({
        variables: { conversationId: convId },
      });
      if (msgData) setMessages(msgData.getConversationMessages);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !conversationId) return;

    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            receiverId: ownerId,
            receiverRole: "PARTNER",
            messageContent: message,
            propertyId: propertyId || undefined,
            attractionId: attractionId || undefined,
          },
        },
      });

      if (data?.sendMessage) {
        setMessages((prev) => [...prev, data.sendMessage]);
        setMessage("");
      }
    } catch (err: any) {
      console.error("Send message error:", err);
    }
  };

  if (!user?._id || user._id === ownerId) return null;

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <Fab
          color="primary"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            bottom: { xs: 84, md: 24 },
            right: { xs: 16, md: 24 },
            zIndex: 1300,
            width: 56,
            height: 56,
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {/* Chat Window */}
      {open && (
        <Stack
          sx={{
            position: "fixed",
            bottom: { xs: 0, md: 24 },
            right: { xs: 0, md: 24 },
            left: { xs: 0, md: "auto" },
            top: { xs: 0, md: "auto" },
            width: { xs: "100%", md: 370 },
            height: { xs: "100%", md: 480 },
            zIndex: 1300,
            borderRadius: { xs: 0, md: 3 },
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
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
            sx={{ backgroundColor: "primary.main" }}
          >
            <Stack>
              <Typography fontWeight={700} fontSize={14} color="white">
                {ownerName}
              </Typography>
              <Typography fontSize={11} color="rgba(255,255,255,0.7)">
                {t("chat.usuallyReplies")}
              </Typography>
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
            gap={1}
            sx={{ overflowY: "auto", backgroundColor: "background.default" }}
          >
            {messages.length === 0 && (
              <Stack alignItems="center" justifyContent="center" flex={1}>
                <Typography fontSize={13} color="text.secondary" textAlign="center">
                  {t("chat.sendMessageTo", { name: ownerName })}
                </Typography>
              </Stack>
            )}
            {messages.map((msg: any) => {
              const isMe = msg.senderId === user._id;
              return (
                <Stack
                  key={msg._id}
                  alignItems={isMe ? "flex-end" : "flex-start"}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: isMe ? "primary.main" : "background.paper",
                      color: isMe ? "white" : "text.primary",
                      border: isMe ? "none" : "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography fontSize={13} lineHeight={1.4}>
                      {msg.messageContent}
                    </Typography>
                  </Box>
                  <Typography fontSize={10} color="text.disabled" mt={0.3} px={0.5}>
                    {new Date(msg.createdAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Stack>
              );
            })}
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
              placeholder={t("chat.typeMessage")}
              size="small"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 5 },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ChatWidget;
