# Deploy and preview the static site.
#
# `make deploy`  → rsync src/ to the production server (additive sync).
# `make dry-run` → show what deploy would do without writing anything.
# `make serve`   → run a local preview server inside src/.
#
# Deploy is additive — it will not delete remote files that no longer
# exist locally. If you need a true mirror, add --delete to RSYNC_FLAGS
# (or run `make deploy RSYNC_DELETE=--delete`).

REMOTE       := jaroszlogistics@quasarj.com:www/
SRC          := src/
PORT         := 8000
RSYNC_DELETE :=

RSYNC_FLAGS := -avz --human-readable \
	--exclude='.DS_Store' \
	--exclude='assets/img/raw/' \
	$(RSYNC_DELETE)

.PHONY: deploy dry-run serve

deploy:
	rsync $(RSYNC_FLAGS) $(SRC) $(REMOTE)

dry-run:
	rsync $(RSYNC_FLAGS) --dry-run --itemize-changes $(SRC) $(REMOTE)

serve:
	cd $(SRC) && python3 -m http.server $(PORT)
