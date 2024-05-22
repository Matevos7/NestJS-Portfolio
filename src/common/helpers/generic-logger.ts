import { Logger } from "@nestjs/common";

export class GenericLogger {
  public logger(name = 'Other'): Logger {
    return new Logger(name);
  }
}
