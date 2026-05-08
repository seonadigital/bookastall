export type DirectusFile = {
  id: string;
  filename_disk?: string;
  title?: string;
};

export type City = {
  id: number;
  name: string;
  slug: string;
  image?: string | DirectusFile | null;
  active_events_count?: number | null;
  venues_count?: number | null;
  stalls_available?: number | null;
  description?: string | null;
  is_active?: boolean | null;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type EventItem = {
  id: number;

  status?: "draft" | "pending_review" | "published" | "archived";

  title: string;
  slug: string;

  organizer_name?: string | null;
  phone?: string | null;

  city?: City | number;
  category?: Category | number | null;

  venue_name?: string | null;
  venue_area?: string | null;
  venue_type?: string | null;
  environment?: string | null;

  start_date?: string | null;
  end_date?: string | null;

  image?: string | DirectusFile | null;

  price_from?: number | null;
  footfall?: number | null;
  booking_status?: string | null;
  is_featured?: boolean | null;

  stall_model?: string | null;
  stall_type?: string | null;
  categories_allowed?: string[] | null;
  facilities_provided?: string[] | null;

  description?: string | null;
  notes?: string | null;
};

export type Schema = {
  cities: City[];
  categories: Category[];
  events: EventItem[];
};