export interface AppPlugin {
    name: string;
    init(): void;
}
