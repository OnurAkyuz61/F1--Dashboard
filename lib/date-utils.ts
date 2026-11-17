// Date formatting utilities

/**
 * Safely parse and format a race date with time
 * @param date - Date string in format "YYYY-MM-DD"
 * @param time - Time string in format "HH:MM:SSZ" or "HH:MM:SS" (optional)
 * @returns Formatted date string in format "MMM dd, yyyy • HH:mm" or "MMM dd, yyyy"
 */
export function formatRaceDate(
  date: string,
  time?: string,
  options: { local?: boolean } = {}
): string {
  const local = options.local ?? true;
  try {
    // Combine date and time into ISO string
    const timeStr = time ? (time.endsWith("Z") ? time : `${time}Z`) : "00:00:00Z";
    const dateTimeStr = `${date}T${timeStr}`;
    const dateObj = new Date(dateTimeStr);

    if (isNaN(dateObj.getTime())) {
      console.warn(`Invalid date/time: ${dateTimeStr}`);
      return date; // Fallback to raw date
    }

    // Format date part: "MMM dd, yyyy"
    // Use Intl.DateTimeFormat for more control
    // Without a time (or before hydration) format the calendar date in UTC so
    // it never shifts a day depending on the viewer's timezone.
    const useLocal = local && Boolean(time);
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      ...(useLocal ? {} : { timeZone: "UTC" }),
    });
    const parts = dateFormatter.formatToParts(dateObj);
    const month = parts.find(p => p.type === "month")?.value || "";
    const day = parts.find(p => p.type === "day")?.value?.padStart(2, "0") || "";
    const year = parts.find(p => p.type === "year")?.value || "";
    const datePart = `${month} ${day}, ${year}`;

    // If time is provided, add time part: " • HH:mm"
    if (time && useLocal) {
      const timePart = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return `${datePart} • ${timePart}`;
    }

    // If no time, return just the date
    return datePart;
  } catch (error) {
    console.error(`Error formatting date: ${date}, time: ${time}`, error);
    return date; // Fallback to raw date string
  }
}

/**
 * Get a Date object from race date and time
 * @param date - Date string in format "YYYY-MM-DD"
 * @param time - Time string in format "HH:MM:SSZ" (optional)
 * @returns Date object or null if invalid
 */
export function getRaceDateObject(date: string, time?: string): Date | null {
  try {
    const timeStr = time || "14:00:00Z";
    const timeWithZ = timeStr.endsWith("Z") ? timeStr : `${timeStr}Z`;
    const dateTimeStr = `${date}T${timeWithZ}`;
    const dateObj = new Date(dateTimeStr);

    if (isNaN(dateObj.getTime())) {
      console.warn(`Invalid date/time: ${dateTimeStr}`);
      return null;
    }

    return dateObj;
  } catch (error) {
    console.error(`Error parsing date: ${date}, time: ${time}`, error);
    return null;
  }
}

/**
 * Format time only from a race date/time
 * @param date - Date string
 * @param time - Time string (optional)
 * @returns Formatted time string or empty string
 */
export function formatRaceTime(date: string, time?: string): string {
  if (!time) return "";

  try {
    const timeStr = time.endsWith("Z") ? time : `${time}Z`;
    const dateTimeStr = `${date}T${timeStr}`;
    const dateObj = new Date(dateTimeStr);

    if (isNaN(dateObj.getTime())) {
      return "";
    }

    return dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (error) {
    return "";
  }
}

