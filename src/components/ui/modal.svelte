<script lang="ts">
	import Spin from '$components/ui/spin.svelte';
	import Button from '$components/ui/button.svelte';
	import Overlay from '$components/ui/overlay.svelte';

	let {
		visible = $bindable(false),
		loading = $bindable(false),
		closable = true,
		// 点击蒙层是否允许关闭
		maskClosable = false,
		// 手动关闭
		closedManually = false,
		//
		headerStyle = '',
		mainStyle = '',
		mainPadding = '',
		footerStyle = '',
		footerJustifyContent = 'flex-end',
		okText = '确定',
		cancelText = '取消',
		confirmButtonProps = {} as ui.ModalButtonProps,
		cancelButtonProps = {} as ui.ModalButtonProps,
		onclose,
		oncommand,
		children,
		title = '标题栏',
		leading,
		footer,
	}: ui.ModalProps = $props()

	let targetElement = {
		offsetTop: 0,
		offsetLeft: 0,
		top: 0,
		left: 0
	};

	let loadingControl = $state({
		confirm: false,
		cancel: false
	})

	const modalStyles = $derived.by(()=> {
		if(targetElement.top === 0) {
			return ''
		}
		return `position: fixed; top: ${targetElement.top}px; left: ${targetElement.left}px`;
	})

	const buttons = $derived.by(()=> {
		const confirmButton: ui.ModalButtonProps = {
			enabled: true,
			textContent: okText,
			color: 'primary' as ui.Colors,
			...confirmButtonProps,
			key: 'confirm',
		}

		const cancelButton: ui.ModalButtonProps = {
			enabled: true,
			textContent: cancelText,
			color: 'default' as ui.Colors,
			...cancelButtonProps,
			key: 'cancel',
		}

		const pieces: ui.ModalButtonProps[] = [];

		if (cancelButton.enabled) {
			pieces.push(cancelButton)
		}
		if (confirmButton.enabled) {
			pieces.push(confirmButton)
		}
		
		return pieces
	})

	const closeControl = () => {
		visible = false;
		loadingControl.cancel = false
		loadingControl.confirm = false
		onclose?.()
	}

	const commandControl = (item: ui.ModalButtonProps) => {
		const { onClick, ...props } = item;
		const detail = {
			close() {
				closeControl()
			},
			loading(complete?: boolean) {
				loadingControl[item.key] = complete || false
			},
			props: {
				...props
			}
		}

		if (typeof item.onClick === 'function') {
			item.onClick?.call(undefined, detail);
		} else {
			oncommand?.call(undefined, detail)
		}

		// 自动关闭
		if(false === closedManually) {
			closeControl()
		}
	}
</script>

<Overlay onclose={closeControl} {maskClosable} bind:visible>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={(e)=> e.stopPropagation() } class="ui-modal" style={modalStyles}>
		<div class="header" style={headerStyle}>
			<div class="west">
				{#if leading}
					{@render leading?.()}
				{/if}
				<h2>{title}</h2>
			</div>
			{#if closable}
				<Button link onclick={closeControl} shape="circle" size="small" icon={{name: 'close', size: 'medium', fill: true}}></Button>
			{/if}
		</div>
		<div class="main" style:padding={mainPadding} style={mainStyle}>
			{@render children?.()}
		</div>
		<div class="footer" style:justify-content={footerJustifyContent} style={footerStyle}>
			{#if footer}
				{@render footer?.()}
			{:else}
				{#each buttons as b}
					{#if b.enabled}
						<Button loading={ loadingControl[b.key] } onclick={ ()=> commandControl(b) } size="small" shape="circle" color={b.color as ui.Colors}>{b.textContent}</Button>
					{/if}
				{/each}
			{/if}
		</div>
    {#if loading}
			<div class="loading">
				<Spin spinning={loading}></Spin>
			</div>
    {/if}
	</div>
</Overlay>

<style lang="scss">
	.ui-modal {
		min-width: 360px;
		background-color: #fff;
		box-shadow:
			0 3px 6px var(--gray--600),
			0 6px 16px var(--gray--600),
			0 9px 28px 8px var(--gray--600);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
    position: relative;
    overflow: hidden;

		.header {
			height: 32px;
			padding: 12px 12px 12px 24px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.west {
				max-width: 80%;
				display: flex;
				align-items: center;
				justify-content: center;

				:global(i) {
					margin-right: 5px;
				}

				h2 {
					font-size: 16px;
					font-weight: bold;
					color: var(--gray-700);
				}
			}
		}

		.main {
			min-height: 24px;
			padding: 8px 24px;
		}

		.footer {
			padding: 16px 24px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			&:empty {
				display: none;
			}

			:global(.default-button) {
				margin-right: 16px;
				&:last-child {
					margin-right: 0;
				}
			}
		}

		.loading {
			position: absolute;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
		}
	}
</style>
