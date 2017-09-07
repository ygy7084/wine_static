module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "linebreak-style":["error", "windows"],
        "no-console":0,
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
    },
};
