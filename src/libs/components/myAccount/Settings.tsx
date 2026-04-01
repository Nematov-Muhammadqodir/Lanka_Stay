import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD, DELETE_ACCOUNT } from "@/apollo/user/mutation";
import {
  sweetConfirmAlert,
  sweetErrorAlert,
  sweetTopSuccessAlert,
} from "../../sweetAlert";
import { logOut } from "../../auth";
import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();

  // Password change state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordMutation, { loading: changingPassword }] =
    useMutation(CHANGE_PASSWORD);

  // Delete account
  const [deleteAccountMutation, { loading: deleting }] =
    useMutation(DELETE_ACCOUNT);

  const handleChangePassword = async () => {
    if (!oldPassword.trim()) {
      await sweetErrorAlert("Please enter your current password", 2500);
      return;
    }
    if (newPassword.length < 6) {
      await sweetErrorAlert(
        "New password must be at least 6 characters",
        2500
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      await sweetErrorAlert("New passwords do not match", 2500);
      return;
    }
    if (oldPassword === newPassword) {
      await sweetErrorAlert(
        "New password must be different from current password",
        2500
      );
      return;
    }

    try {
      await changePasswordMutation({
        variables: { oldPassword, newPassword },
      });
      await sweetTopSuccessAlert("Password changed successfully!", 2000);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const msg =
        err.graphQLErrors?.[0]?.message || "Failed to change password";
      await sweetErrorAlert(msg, 2500);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = await sweetConfirmAlert(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    const doubleConfirm = await sweetConfirmAlert(
      "This will permanently deactivate your account. All your data will be inaccessible. Continue?"
    );
    if (!doubleConfirm) return;

    try {
      await deleteAccountMutation();
      await sweetTopSuccessAlert("Account deleted. Goodbye!", 2000);
      logOut();
      router.push("/");
    } catch (err: any) {
      const msg =
        err.graphQLErrors?.[0]?.message || "Failed to delete account";
      await sweetErrorAlert(msg, 2500);
    }
  };

  return (
    <Stack width="100%" gap={4}>
      <Typography variant="h4" fontWeight={700}>
        Settings
      </Typography>

      {/* Change Password Section */}
      <Stack
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
        gap={2.5}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <LockIcon sx={{ color: "primary.main" }} />
          <Typography fontWeight={700} fontSize={18}>
            Change Password
          </Typography>
        </Stack>

        <TextField
          label="Current Password"
          type="password"
          fullWidth
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ maxWidth: 400 }}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          helperText="Minimum 6 characters"
          sx={{ maxWidth: 400 }}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={
            confirmPassword.length > 0 && confirmPassword !== newPassword
          }
          helperText={
            confirmPassword.length > 0 && confirmPassword !== newPassword
              ? "Passwords do not match"
              : ""
          }
          sx={{ maxWidth: 400 }}
        />

        <Button
          variant="contained"
          onClick={handleChangePassword}
          disabled={changingPassword || !oldPassword || !newPassword || !confirmPassword}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            width: "fit-content",
            px: 3,
            py: 1,
          }}
          startIcon={
            changingPassword ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <CheckCircleIcon />
            )
          }
        >
          {changingPassword ? "Changing..." : "Update Password"}
        </Button>
      </Stack>

      {/* Delete Account Section */}
      <Stack
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "error.main",
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
        gap={2}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <WarningAmberIcon sx={{ color: "error.main" }} />
          <Typography fontWeight={700} fontSize={18} color="error.main">
            Danger Zone
          </Typography>
        </Stack>

        <Typography fontSize={14} color="text.secondary">
          Permanently delete your account and all associated data. This includes
          your profile, reservations history, reviews, and favorites. This
          action cannot be undone.
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteAccount}
          disabled={deleting}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            width: "fit-content",
            px: 3,
            py: 1,
          }}
          startIcon={
            deleting ? (
              <CircularProgress size={16} color="error" />
            ) : (
              <DeleteForeverIcon />
            )
          }
        >
          {deleting ? "Deleting..." : "Delete My Account"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Settings;
