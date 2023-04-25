package ru.tinkoff.edu.backend.enums;

import java.nio.file.Paths;

public enum FileStorageLocation {
    USER_PROFILE_PHOTO(Paths.get("images", "users", "profile_photos").toString(), "/api/user/image"),
    USER_CERTIFICATES(Paths.get("images", "users", "certificates").toString(), "/api/user/certificate");

    private final String path;
    private final String api;

    FileStorageLocation(String path, String api) {
        this.path = path;
        this.api = api;
    }

    public String getPath() {
        return path;
    }

    public String getApi() {
        return api;
    }
}
