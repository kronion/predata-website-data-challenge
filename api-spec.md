# API

## Tags

---

`POST` to `/tag`

Create a tag.

#### Data

```
{
    name: string,
}
```

---

`GET` to `/tag/:id`

Get a tag.

---

`GET` to `/tags`

Gets all tags.

---

## Website

---

`POST` to `/website`

Creates a new website.

#### Data

```
{
    url: string
    tags: Array<number> #tag ids
}
```

---

`GET` to `/website/:id`

Gets a website.

---

`GET` to `/websites`

#### Query Param:

`tags: comma separated list of tag names to filter websites by`

Gets all filtered website.

---

`PUT` to `/website/:website_id/tag/:tag_id`

Associate a tag to a website.
