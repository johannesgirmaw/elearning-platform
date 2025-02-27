export interface UserPermission {
  id: string,
  user: string,
  content_type: string,
  can_view:boolean,
  can_change:boolean,
  can_create:boolean,
  can_delete:boolean,
  other_action:boolean
}

