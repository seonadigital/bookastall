const DIRECTUS_URL = 'https://admin.bookastall.in';
const TOKEN = '_GDtZYT4hwVFv62TLHSeymn7-dlUZvpN';

if (!DIRECTUS_URL || !TOKEN) {
  throw new Error("Missing DIRECTUS_URL or DIRECTUS_STATIC_TOKEN in .env.local");
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

async function request(path, options = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const text = await res.text();

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      typeof data === "object"
        ? JSON.stringify(data, null, 2)
        : String(data);

    throw new Error(`${options.method || "GET"} ${path} failed:\n${message}`);
  }

  return data;
}

async function safeCreate(label, fn) {
  try {
    await fn();
    console.log(`✅ ${label}`);
  } catch (error) {
    const message = error.message || "";

    if (
      message.includes("already exists") ||
      message.includes("RECORD_NOT_UNIQUE") ||
      message.includes("Field already exists") ||
      message.includes("Collection already exists") ||
      message.includes("already contains")
    ) {
      console.log(`⏭️  ${label} already exists`);
      return;
    }

    console.error(`❌ ${label}`);
    throw error;
  }
}

async function createCollection(collection, icon = "box") {
  await request("/collections", {
    method: "POST",
    body: JSON.stringify({
      collection,
      meta: {
        collection,
        icon,
        note: null,
        hidden: false,
        singleton: false,
        accountability: "all",
      },
      schema: {
        name: collection,
      },
    }),
  });
}

async function createField(collection, field) {
  await request(`/fields/${collection}`, {
    method: "POST",
    body: JSON.stringify(field),
  });
}

async function createRelation(relation) {
  await request("/relations", {
    method: "POST",
    body: JSON.stringify(relation),
  });
}

function uuidPrimaryKey() {
  return {
    field: "id",
    type: "uuid",
    schema: {
      is_primary_key: true,
      is_nullable: false,
    },
    meta: {
      hidden: true,
      readonly: true,
      interface: "input",
      special: ["uuid"],
    },
  };
}

function statusField() {
  return {
    field: "status",
    type: "string",
    schema: {
      default_value: "draft",
      is_nullable: false,
      max_length: 255,
    },
    meta: {
      interface: "select-dropdown",
      options: {
        choices: [
          { text: "Draft", value: "draft" },
          { text: "Published", value: "published" },
          { text: "Archived", value: "archived" },
          { text: "Pending Review", value: "pending_review" },
        ],
      },
      special: ["status"],
      width: "half",
    },
  };
}

function stringField(field, options = {}) {
  return {
    field,
    type: "string",
    schema: {
      is_nullable: options.required ? false : true,
      max_length: options.maxLength || 255,
      default_value: options.defaultValue ?? null,
    },
    meta: {
      interface: options.interface || "input",
      width: options.width || "full",
      required: Boolean(options.required),
      options: options.options || null,
    },
  };
}

function textField(field, options = {}) {
  return {
    field,
    type: "text",
    schema: {
      is_nullable: options.required ? false : true,
    },
    meta: {
      interface: options.interface || "input-multiline",
      width: options.width || "full",
      required: Boolean(options.required),
    },
  };
}

function integerField(field, options = {}) {
  return {
    field,
    type: "integer",
    schema: {
      is_nullable: options.required ? false : true,
      default_value: options.defaultValue ?? null,
    },
    meta: {
      interface: "input",
      width: options.width || "half",
      required: Boolean(options.required),
    },
  };
}

function booleanField(field, options = {}) {
  return {
    field,
    type: "boolean",
    schema: {
      is_nullable: false,
      default_value: options.defaultValue ?? false,
    },
    meta: {
      interface: "boolean",
      width: options.width || "half",
    },
  };
}

function dateField(field, options = {}) {
  return {
    field,
    type: "date",
    schema: {
      is_nullable: options.required ? false : true,
    },
    meta: {
      interface: "datetime",
      width: options.width || "half",
      required: Boolean(options.required),
    },
  };
}

function jsonField(field, options = {}) {
  return {
    field,
    type: "json",
    schema: {
      is_nullable: true,
    },
    meta: {
      interface: "tags",
      width: options.width || "full",
    },
  };
}

function fileField(field, options = {}) {
  return {
    field,
    type: "uuid",
    schema: {
      is_nullable: true,
    },
    meta: {
      interface: "file-image",
      special: ["file"],
      width: options.width || "full",
    },
  };
}

function m2oField(field, relatedCollection, options = {}) {
  return {
    field,
    type: "integer",
    schema: {
      is_nullable: options.required ? false : true,
    },
    meta: {
      interface: "select-dropdown-m2o",
      special: ["m2o"],
      width: options.width || "half",
      required: Boolean(options.required),
      options: {
        template: "{{name}}",
      },
    },
  };
}

async function createCities() {
  await safeCreate("Create cities collection", () =>
    createCollection("cities", "location_city")
  );

  const fields = [
    uuidPrimaryKey(),
    stringField("name", { required: true, width: "half" }),
    stringField("slug", { required: true, width: "half" }),
    fileField("image"),
    integerField("active_events_count", { defaultValue: 0 }),
    integerField("venues_count", { defaultValue: 0 }),
    integerField("stalls_available", { defaultValue: 0 }),
    textField("description"),
    booleanField("is_active", { defaultValue: true }),
  ];

  for (const field of fields) {
    await safeCreate(`Create cities.${field.field}`, () =>
      createField("cities", field)
    );
  }
}

async function createCategories() {
  await safeCreate("Create categories collection", () =>
    createCollection("categories", "category")
  );

  const fields = [
    uuidPrimaryKey(),
    stringField("name", { required: true, width: "half" }),
    stringField("slug", { required: true, width: "half" }),
  ];

  for (const field of fields) {
    await safeCreate(`Create categories.${field.field}`, () =>
      createField("categories", field)
    );
  }
}

async function createEvents() {
  await safeCreate("Create events collection", () =>
    createCollection("events", "event")
  );

  const fields = [
    uuidPrimaryKey(),
    statusField(),
    stringField("title", { required: true }),
    stringField("slug", { required: true, width: "half" }),
    m2oField("city", "cities", { required: true }),
    m2oField("category", "categories"),
    stringField("venue_name", { width: "half" }),
    stringField("venue_area", { width: "half" }),
    stringField("venue_type", {
      width: "half",
      interface: "select-dropdown",
      options: {
        choices: [
          { text: "Hotel", value: "Hotel" },
          { text: "Convention Center", value: "Convention Center" },
          { text: "Banquet Hall", value: "Banquet Hall" },
          { text: "Open Ground", value: "Open Ground" },
          { text: "Mall", value: "Mall" },
          { text: "Exhibition Hall", value: "Exhibition Hall" },
          { text: "Club", value: "Club" },
          { text: "Other", value: "Other" },
        ],
      },
    }),
    stringField("environment", {
      width: "half",
      interface: "select-dropdown",
      options: {
        choices: [
          { text: "Indoor", value: "Indoor" },
          { text: "Outdoor", value: "Outdoor" },
          { text: "Both", value: "Both" },
        ],
      },
    }),
    dateField("start_date"),
    dateField("end_date"),
    fileField("image"),
    integerField("price_from"),
    integerField("footfall"),
    stringField("booking_status", {
      width: "half",
      defaultValue: "Booking Open",
    }),
    booleanField("is_featured", { defaultValue: false }),
    textField("description"),
  ];

  for (const field of fields) {
    await safeCreate(`Create events.${field.field}`, () =>
      createField("events", field)
    );
  }

  await safeCreate("Create events.city relation", () =>
    createRelation({
      collection: "events",
      field: "city",
      related_collection: "cities",
      meta: {
        many_collection: "events",
        many_field: "city",
        one_collection: "cities",
        one_field: "events",
      },
      schema: {
        table: "events",
        column: "city",
        foreign_key_table: "cities",
        foreign_key_column: "id",
        constraint_name: "events_city_foreign",
        on_delete: "SET NULL",
      },
    })
  );

  await safeCreate("Create events.category relation", () =>
    createRelation({
      collection: "events",
      field: "category",
      related_collection: "categories",
      meta: {
        many_collection: "events",
        many_field: "category",
        one_collection: "categories",
        one_field: "events",
      },
      schema: {
        table: "events",
        column: "category",
        foreign_key_table: "categories",
        foreign_key_column: "id",
        constraint_name: "events_category_foreign",
        on_delete: "SET NULL",
      },
    })
  );

  await safeCreate("Create events.image file relation", () =>
    createRelation({
      collection: "events",
      field: "image",
      related_collection: "directus_files",
      meta: {
        many_collection: "events",
        many_field: "image",
        one_collection: "directus_files",
      },
      schema: {
        table: "events",
        column: "image",
        foreign_key_table: "directus_files",
        foreign_key_column: "id",
        constraint_name: "events_image_foreign",
        on_delete: "SET NULL",
      },
    })
  );
}

async function createEventSubmissions() {
  await safeCreate("Create event_submissions collection", () =>
    createCollection("event_submissions", "approval")
  );

  const fields = [
    uuidPrimaryKey(),
    statusField(),
    stringField("organizer_name", { required: true }),
    stringField("phone", { required: true, width: "half" }),
    stringField("event_title", { required: true }),
    stringField("city", { required: true, width: "half" }),
    stringField("venue_name", { required: true, width: "half" }),
    stringField("venue_type", { required: true, width: "half" }),
    stringField("environment", { required: true, width: "half" }),
    dateField("start_date", { required: true }),
    dateField("end_date", { required: true }),
    stringField("stall_model", { required: true, width: "half" }),
    stringField("stall_type", { required: true, width: "half" }),
    jsonField("categories_allowed"),
    jsonField("facilities_provided"),
    integerField("stall_price_from"),
    textField("notes"),
  ];

  for (const field of fields) {
    await safeCreate(`Create event_submissions.${field.field}`, () =>
      createField("event_submissions", field)
    );
  }
}

async function seedData() {
  const cityItems = [
    {
      name: "Hyderabad",
      slug: "hyderabad",
      active_events_count: 45,
      venues_count: 12,
      stalls_available: 1200,
      description:
        "Discover premium exhibitions, flea markets, and trade shows happening across the Pearl City.",
      is_active: true,
    },
    {
      name: "Bangalore",
      slug: "bangalore",
      active_events_count: 32,
      venues_count: 10,
      stalls_available: 850,
      description:
        "Browse premium exhibitions, popups, and trade shows across Bangalore.",
      is_active: true,
    },
    {
      name: "Mumbai",
      slug: "mumbai",
      active_events_count: 58,
      venues_count: 18,
      stalls_available: 1600,
      description:
        "Find high-footfall exhibitions, flea markets, and lifestyle events across Mumbai.",
      is_active: true,
    },
  ];

  const categoryItems = [
    { name: "Food & Lifestyle", slug: "food-lifestyle" },
    { name: "Flea Markets", slug: "flea-markets" },
    { name: "Exhibitions", slug: "exhibitions" },
    { name: "Corporate Events", slug: "corporate-events" },
    { name: "Food Festivals", slug: "food-festivals" },
  ];

  for (const item of cityItems) {
    await safeCreate(`Seed city ${item.name}`, async () => {
      await request("/items/cities", {
        method: "POST",
        body: JSON.stringify(item),
      });
    });
  }

  for (const item of categoryItems) {
    await safeCreate(`Seed category ${item.name}`, async () => {
      await request("/items/categories", {
        method: "POST",
        body: JSON.stringify(item),
      });
    });
  }

  const cities = await request("/items/cities?fields=id,slug");
  const categories = await request("/items/categories?fields=id,slug");

  const hyderabad = cities.data.find((city) => city.slug === "hyderabad");
  const foodLifestyle = categories.data.find(
    (category) => category.slug === "food-lifestyle"
  );

  if (!hyderabad || !foodLifestyle) {
    console.log("⚠️ Skipping event seed because city/category was not found");
    return;
  }

  await safeCreate("Seed sample event", async () => {
    await request("/items/events", {
      method: "POST",
      body: JSON.stringify({
        status: "published",
        title: "The Great Hyderabad Food & Flea Festival",
        slug: "great-hyderabad-food-flea-festival",
        city: hyderabad.id,
        category: foodLifestyle.id,
        venue_name: "Hitex Exhibition Center",
        venue_area: "Madhapur",
        venue_type: "Exhibition Hall",
        environment: "Indoor",
        start_date: "2026-10-24",
        end_date: "2026-10-26",
        price_from: 8500,
        footfall: 15000,
        booking_status: "Booking Open",
        is_featured: true,
        description:
          "A premium food and lifestyle festival with high vendor visibility and strong expected footfall.",
      }),
    });
  });
}

async function main() {
  console.log("🚀 Creating Directus schema...");

  await createCities();
  await createCategories();
  await createEvents();
  await createEventSubmissions();

  const shouldSeed = process.argv.includes("--seed");

  if (shouldSeed) {
    console.log("🌱 Seeding starter data...");
    await seedData();
  }

  console.log("✅ Directus schema setup complete");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});