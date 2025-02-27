export interface GroupPermission {
  id: string,
  group: string,
  content_type: string,
  can_view:boolean,
  can_change:boolean,
  can_create:boolean,
  can_delete:boolean,
  other_action:boolean
}

export interface Group {
  id: string,
  name: string,
}

