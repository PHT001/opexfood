"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserInfo {
  email: string;
  initials: string;
  restaurantName: string;
}

let cachedUser: UserInfo | null = null;
let fetchPromise: Promise<UserInfo | null> | null = null;

async function fetchUser(): Promise<UserInfo | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const email = user.email || "";
  const initials = email
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();

  // Get restaurant name
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("name")
    .eq("user_id", user.id)
    .single();

  return {
    email,
    initials,
    restaurantName: restaurant?.name || "Mon Restaurant",
  };
}

export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  useEffect(() => {
    if (cachedUser) return;
    if (!fetchPromise) {
      fetchPromise = fetchUser().then((u) => {
        cachedUser = u;
        fetchPromise = null;
        return u;
      });
    }
    fetchPromise.then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
