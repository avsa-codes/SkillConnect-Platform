"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Loader2, Key, LinkIcon, Bell, Shield, Trash2 } from "lucide-react"

export default function StudentSettingsPage() {
  const { user, changePassword, linkGoogleAccount } = useAuth()
const router = useRouter();
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [showPwPopup, setShowPwPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    offers: true,
    payments: true,
    updates: false,
    marketing: false,
  })

const handleChangePassword = async () => {
  try {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const supabase = createSupabaseBrowserClient();

    console.log("[pw] calling supabase.auth.updateUser...");
    const { error, data } = await supabase.auth.updateUser({
      password: passwordForm.newPassword,
    });
    console.log("[pw] supabase.updateUser result:", { error, data });

    setIsLoading(false);

    if (error) {
      console.error("[pw] update error:", error);
      toast.error(error.message || "Failed to change password");
      return;
    }

    // 1) close modal state immediately
    try {
      setIsPasswordOpen(false);
      console.log("[pw] setIsPasswordOpen(false) called");
    } catch (err) {
      console.warn("[pw] setIsPasswordOpen failed", err);
    }

    // 2) force Next.js client refresh (if layout is caching)
    try {
      router.refresh();
      console.log("[pw] router.refresh() called");
    } catch (err) {
      console.warn("[pw] router.refresh failed", err);
    }

    // 3) best-effort: close any open dialog DOM nodes (bubble-safe)
    try {
      // many UI libs add data-state="open" to dialog roots; try a few selectors
      setTimeout(() => {
        document.querySelectorAll('[data-state="open"], dialog[open]').forEach((el) => {
          try {
            // prefer clicking close buttons inside the dialog if present
            const closeBtn = (el as HTMLElement).querySelector('[aria-label="Close"], button[data-close], button[data-state="close"], button:has(svg[aria-hidden="true"])');
            if (closeBtn) (closeBtn as HTMLElement).click();
            else (el as HTMLElement).dispatchEvent(new Event("close"));
          } catch (e) {
            // fallback: blur / remove attribute
            try { (el as HTMLElement).removeAttribute("open"); } catch {}
          }
        });
        console.log("[pw] attempted DOM dialog close");
      }, 40);
    } catch (err) {
      console.warn("[pw] DOM close attempt failed", err);
    }

    // 4) show success toast so user sees immediate feedback
    // toast.success("Password changed successfully — you'll be signed out to re-login.");
    setShowPwPopup(true);
setTimeout(() => setShowPwPopup(false), 2000); // hide automatically


    // 5) reset fields
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });

    // 6) sign out then force full navigation to /auth (hard reload)
    setTimeout(async () => {
      try {
        console.log("[pw] signing out...");
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("[pw] signOut error", err);
      } finally {
        // use location.replace to force a full navigation (no back entry)
        window.location.replace("/auth");
      }
    }, 900);
  } catch (err) {
    console.error("[pw] unexpected error", err);
    setIsLoading(false);
    toast.error("Unexpected error. Check console.");
  }
};





  const handleLinkGoogle = async () => {
    setIsLoading(true)
    const result = await linkGoogleAccount()

    if (result.success) {
      toast.success("Google account linked successfully!")
    } else {
      toast.error(result.error || "Failed to link Google account")
    }

    setIsLoading(false)
  }

 const handleDeleteAccount = async () => {
  if (!user) {
    toast.error("User not found");
    return;
  }

  const res = await fetch("/api/student/delete-account", {
    method: "POST",
    body: JSON.stringify({ userId: user.id }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.error || "Failed to delete account");
    return;
  }

  toast.success("Account deleted successfully!");
  window.location.href = "/auth"; // logout redirect
};


  return (
    <DashboardLayout allowedRoles={["student"]}>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Account Section */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Account
            </CardTitle>
            <CardDescription>Manage your login credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">••••••••</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsPasswordOpen(true)} className="rounded-xl">
                Change
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Google Account</p>
                <p className="text-sm text-muted-foreground">Not linked</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLinkGoogle}
                disabled={isLoading}
                className="rounded-xl bg-transparent"
              >
                <LinkIcon className="h-4 w-4 mr-1" />
                Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose what you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Offers</p>
                <p className="text-sm text-muted-foreground">Get notified when you receive a new offer</p>
              </div>
              <Switch
                checked={notifications.offers}
                onCheckedChange={(checked) => setNotifications({ ...notifications, offers: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payments</p>
                <p className="text-sm text-muted-foreground">Get notified about payment activity</p>
              </div>
              <Switch
                checked={notifications.payments}
                onCheckedChange={(checked) => setNotifications({ ...notifications, payments: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about changes to your tasks</p>
              </div>
              <Switch
                checked={notifications.updates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing</p>
                <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Section */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>Manage your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">Allow organizations to view your profile</p>
              </div>
              <Switch defaultChecked />
            </div>

            {/* <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Download Data</p>
                <p className="text-sm text-muted-foreground">Get a copy of your data</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                Request
              </Button>
            </div> */}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-2xl border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="rounded-xl">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction
  onClick={handleDeleteAccount}
  className="rounded-xl bg-red-600 text-white hover:bg-red-700"
>
  Delete Account
</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and a new password.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleChangePassword} disabled={isLoading} className="rounded-xl">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Small popup confirmation */}
{showPwPopup && (
  <div className="fixed bottom-6 right-6 z-[200] bg-white shadow-xl border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <p className="text-sm font-medium text-gray-800">Password changed successfully!</p>
  </div>
)}

    </DashboardLayout>
  )
}
