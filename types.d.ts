interface ChromeStorage<T extends object> {
    get(): Promise<T | null>;
    set(value: T): Promise<T>;
}

interface HeaderOverride {
    id: string;
    name: string;
    value: string;
    active: boolean;
}

interface AppState {
    headerOverrides: HeaderOverride[];
}

interface StateService {
    getHeaderOverrides: () => HeaderOverride[];
    addHeaderOverride: (data: Omit<HeaderOverride, "id">) => Promise<void>;
    removeHeaderOverride: (id: string) => Promise<void>;
    removeAllHeaderOverrides: () => Promise<void>;
    toggleHeaderOverride: (id: string) => Promise<void>;
    updateHeaderOverrideName: (id: string, name: string) => Promise<void>;
    updateHeaderOverrideValue: (id: string, value: string) => Promise<void>;
}

export { AppState, ChromeStorage, HeaderOverride, StateService };
