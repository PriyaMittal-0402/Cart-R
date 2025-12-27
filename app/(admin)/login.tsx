const onSignInPress = async () => {
    setLoading(true);
    try {
        const { data, error } = await signIn(form.email, form.password);

        if (error) {
            Alert.alert("Login Failed", error.message);
            return;
        }

        const user = data.user;

        // 🔐 VERIFY ADMIN
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role, is_verified")
            .eq("id", user.id)
            .single();

        if (
            profileError ||
            profile.role !== "admin" ||
            profile.is_verified !== true
        ) {
            await supabase.auth.signOut();
            Alert.alert(
                "Access Denied",
                "Admin verification required."
            );
            return;
        }

        // ✅ VERIFIED ADMIN → ACCESS GRANTED
        router.replace("/admin/dashboard");

    } catch (err: any) {
        Alert.alert("Error", err.message);
    } finally {
        setLoading(false);
    }
};
