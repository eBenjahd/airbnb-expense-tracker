export function formatMonthYear(dateString: string): string {
    if (!dateString) return "";
  
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(dateString));
  }