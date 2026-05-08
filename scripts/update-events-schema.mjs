const DIRECTUS_URL = 'https://admin.bookastall.in';
const TOKEN = '_GDtZYT4hwVFv62TLHSeymn7-dlUZvpN';

if (!DIRECTUS_URL || !TOKEN) {
    throw new Error("Missing DIRECTUS_URL or DIRECTUS_STATIC_TOKEN");
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
            typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);

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
            message.includes("already contains") ||
            message.includes("already has an associated relationship") ||
            message.includes("INVALID_PAYLOAD")
        ) {
            console.log(`⏭️  ${label} already exists`);
            return;
        }

        console.error(`❌ ${label}`);
        throw error;
    }
}

async function getCollection(collection) {
    try {
        return await request(`/collections/${collection}`);
    } catch {
        return null;
    }
}

async function createCollection(collection, icon = "box") {
    const existing = await getCollection(collection);

    if (existing?.data) {
        console.log(`⏭️  Collection ${collection} already exists`);
        return;
    }

    await request("/collections", {
        method: "POST",
        body: JSON.stringify({
            collection,
            meta: {
                collection,
                icon,
                hidden: false,
                singleton: false,
                accountability: "all",
            },
            schema: {
                name: collection,
            },
        }),
    });

    console.log(`✅ Collection ${collection} created`);
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

// IMPORTANT:
// Directus default IDs are usually integer.
// So M2O fields should be integer, not uuid.
function m2oField(field, options = {}) {
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
            width: "half",
            special: ["status"],
            options: {
                choices: [
                    { text: "Draft", value: "draft" },
                    { text: "Pending Review", value: "pending_review" },
                    { text: "Published", value: "published" },
                    { text: "Archived", value: "archived" },
                ],
            },
        },
    };
}

async function ensureCitiesCollection() {
    await createCollection("cities", "location_city");

    const fields = [
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

async function ensureCategoriesCollection() {
    await createCollection("categories", "category");

    const fields = [
        stringField("name", { required: true, width: "half" }),
        stringField("slug", { required: true, width: "half" }),
    ];

    for (const field of fields) {
        await safeCreate(`Create categories.${field.field}`, () =>
            createField("categories", field)
        );
    }
}

async function ensureEventsCollection() {
    await createCollection("events", "event");

    const fields = [
        // Visibility / workflow
        statusField(),

        // Public event fields
        stringField("title", { required: true }),
        stringField("slug", { required: true, width: "half" }),
        m2oField("city", { required: true }),
        m2oField("category"),
        fileField("image"),

        stringField("venue_name", { required: true, width: "half" }),
        stringField("venue_area", { width: "half" }),

        stringField("venue_type", {
            required: true,
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
            required: true,
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

        dateField("start_date", { required: true }),
        dateField("end_date", { required: true }),

        integerField("price_from"),
        integerField("footfall", { defaultValue: 0 }),
        stringField("booking_status", {
            width: "half",
            defaultValue: "Pending Review",
        }),
        booleanField("is_featured", { defaultValue: false }),

        textField("description"),

        // Organizer submission fields
        stringField("organizer_name", { width: "half" }),
        stringField("phone", { width: "half" }),

        stringField("stall_model", {
            width: "half",
            interface: "select-dropdown",
            options: {
                choices: [
                    { text: "Open Table", value: "Open Table" },
                    { text: "Canopy", value: "Canopy" },
                    { text: "Octanorm", value: "Octanorm" },
                    { text: "Shell Scheme", value: "Shell Scheme" },
                    { text: "Raw Space", value: "Raw Space" },
                    { text: "Others", value: "Others" },
                ],
            },
        }),

        stringField("stall_type", {
            width: "half",
            interface: "select-dropdown",
            options: {
                choices: [
                    { text: "With Tables", value: "With Tables" },
                    { text: "With Chairs", value: "With Chairs" },
                    { text: "Tables & Chairs", value: "Tables & Chairs" },
                    { text: "Empty Space", value: "Empty Space" },
                ],
            },
        }),

        jsonField("categories_allowed"),
        jsonField("facilities_provided"),
        textField("notes"),
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

async function seedBasicData() {
    const cities = [
        {
            name: "Hyderabad",
            slug: "hyderabad",
            active_events_count: 45,
            venues_count: 12,
            stalls_available: 1200,
            description:
                "Discover premium exhibitions, flea markets, and trade shows happening across Hyderabad.",
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

    const categories = [
        { name: "Food & Lifestyle", slug: "food-lifestyle" },
        { name: "Flea Markets", slug: "flea-markets" },
        { name: "Exhibitions", slug: "exhibitions" },
        { name: "Corporate Events", slug: "corporate-events" },
        { name: "Food Festivals", slug: "food-festivals" },
    ];

    for (const city of cities) {
        const existing = await request(
            `/items/cities?filter[slug][_eq]=${city.slug}&limit=1`
        );

        if (existing.data.length) {
            console.log(`⏭️  City ${city.name} already exists`);
            continue;
        }

        await request("/items/cities", {
            method: "POST",
            body: JSON.stringify(city),
        });

        console.log(`✅ Seeded city ${city.name}`);
    }

    for (const category of categories) {
        const existing = await request(
            `/items/categories?filter[slug][_eq]=${category.slug}&limit=1`
        );

        if (existing.data.length) {
            console.log(`⏭️  Category ${category.name} already exists`);
            continue;
        }

        await request("/items/categories", {
            method: "POST",
            body: JSON.stringify(category),
        });

        console.log(`✅ Seeded category ${category.name}`);
    }
}

async function main() {
    console.log("🚀 Updating Directus schema for single events collection...");

    await ensureCitiesCollection();
    await ensureCategoriesCollection();
    await ensureEventsCollection();

    if (process.argv.includes("--seed")) {
        console.log("🌱 Seeding basic data...");
        await seedBasicData();
    }

    console.log("✅ Events schema is ready");
    console.log("");
    console.log("You can now ignore/delete event_submissions.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});