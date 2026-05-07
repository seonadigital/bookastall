export type DirectusFile = {
  id: string;
  filename_disk?: string;
  title?: string;
};

export type City = {
  id: string;
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
  id: string;
  name: string;
  slug: string;
};

export type EventItem = {
  id: string;
  status?: string;
  title: string;
  slug: string;
  city?: City | string;
  category?: Category | string;
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
  description?: string | null;
};

export type EventSubmission = {
  id?: string;
  status?: string;
  organizer_name: string;
  phone: string;
  event_title: string;
  city: string;
  venue_name: string;
  venue_type: string;
  environment: string;
  start_date: string;
  end_date: string;
  stall_model: string;
  stall_type: string;
  categories_allowed?: string[];
  facilities_provided?: string[];
  stall_price_from?: number;
  notes?: string;
};

export type Schema = {
  cities: City[];
  categories: Category[];
  events: EventItem[];
  event_submissions: EventSubmission[];
};