/**
 * Wallet Domain Entity
 * Represents a user's crypto wallet
 */

export interface WalletProps {
  walletId: string;
  tokenSymbol: string;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Wallet {
  private readonly props: WalletProps;

  constructor(props: WalletProps) {
    this.validateWallet(props);
    this.props = props;
  }

  // Getters
  get walletId(): string {
    return this.props.walletId;
  }

  get tokenSymbol(): string {
    return this.props.tokenSymbol;
  }

  get walletBalance(): number {
    return this.props.walletBalance;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateBalance(newBalance: number): void {
    if (newBalance < 0) {
      throw new Error('Wallet balance cannot be negative');
    }
    this.props.walletBalance = newBalance;
    this.props.updatedAt = new Date();
  }

  addFunds(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    this.props.walletBalance += amount;
    this.props.updatedAt = new Date();
  }

  deductFunds(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    if (this.props.walletBalance < amount) {
      throw new Error('Insufficient funds');
    }
    this.props.walletBalance -= amount;
    this.props.updatedAt = new Date();
  }

  // Validation methods
  private validateWallet(props: WalletProps): void {
    if (!props.walletId || props.walletId.trim().length === 0) {
      throw new Error('Wallet ID is required');
    }
    if (!props.tokenSymbol || props.tokenSymbol.trim().length === 0) {
      throw new Error('Token symbol is required');
    }
    if (props.walletBalance < 0) {
      throw new Error('Wallet balance cannot be negative');
    }
  }

  // Factory method for creating new wallets
  static create(tokenSymbol: string): Wallet {
    const now = new Date();
    return new Wallet({
      walletId: crypto.randomUUID(),
      tokenSymbol,
      walletBalance: 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Convert to plain object for persistence
  toJSON(): WalletProps {
    return { ...this.props };
  }
} 